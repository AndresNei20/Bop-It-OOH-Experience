const express = require('express');
const http = require("http")
const cors = require('cors');
const PORT = 3000
const {SerialPort} = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');
const Firebase = require("./firebase.js");


const app = express();
app.use(cors())
const server = http.createServer(app);;

//ArduANO

/* const protocolConfiguration = {
  path: 'COM3',
  baudRate: 9600
}

const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());

SerialPort.list().then(
  ports => ports.forEach(port => console.log(port.path)), //COM3
  err => console.log(err)
) */

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.table({
      'Player:': `http://localhost:${PORT}/player`,
      'Mupi:': `http://localhost:${PORT}/mupi`,
  });
});

app.use('/mupi', express.static('mupi'))
app.use('/player', express.static('client'))
app.use(express.json())

//Comportamiento del servidor
const io = require('socket.io')(server, {
  path: '/real-time',
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let playersConnected = 0;
let firstPressed = false;
/* let colors = ['red', 'magenta', 'yellow', 'bopIt', 'orange', 'blue', 'button', 'scream', 'shake']; */
let colors = ['red', 'magenta', 'yellow', 'bopIt', 'orange', 'blue', 'scream'];
function randomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
let currentColor = randomColor();

const players = {
  player1: {
    id: 0,
    name: "",
    birthday: "",
    email: "",
    score: 0,
    color: "",
    isWaiting: false,
  },
  player2: {
    id: 0,
    name: "",
    birthday: "",
    email: "",
    score: 0,
    color: "",
    isWaiting: false
  }
};

let assigned = {};

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

/* parser.on('data', (data) => {
      console.log("this is my data", data);
      socket.emit('pressed', data);
    }); */

io.on('connect', (socket) => {
    console.log("Client connected:" );
    
    console.log("players connected:", playersConnected)

    socket.on('mupi-connected', () => {
      console.log("mupi connected")
      socket.clientType = 'mupi'; 
    });

    
    
    socket.on('player-connected', async () => {
          // ... código para manejar la conexión del jugador ...
      socket.clientType = 'player';  // Asignar un tipo al socket para saber que es un jugador
      playersConnected++;
      console.log("players connected:", playersConnected);
    
      let userToCreate;
      let playerKey;
    
      if (!players.player1.id) {
        players.player1.color = "blue";
        userToCreate = players.player1;
        playerKey = 'player1';
      } else if (!players.player2.id) {
        players.player2.color = "red";
        userToCreate = players.player2;
        playerKey = 'player2';
        io.emit('change-to-instructions');
      }
    
      // Crear usuario en Firestore y esperar los datos actualizados
      try {
        const updatedUser = await Firebase.createUserDB(userToCreate);
    
        // Asignar el usuario actualizado a 'assigned'
        assigned = updatedUser;

        // Almacena el ID de Firebase en el objeto socket
        socket.userId = updatedUser.id; // Asumiendo que updatedUser contiene el ID de Firebase
    
        // Actualizar el jugador correspondiente en el arreglo 'players'
        players[playerKey] = assigned;

    
        // Envía el nombre asignado al cliente
        socket.emit('assigned', assigned);
        console.log('Enviado a Firebase y al cliente:', assigned);
      } catch (error) {
        console.error("Error al crear usuario en Firebase:", error);
      }
    
      console.log(players);
    });
    
    socket.on('players-details', (data) => {
      if (data.id == players.player1.id) {
        players.player1 = data;
        Firebase.EditUserDB(data)
      } else if(data.id == players.player2.id) {
        players.player2 = data;
        Firebase.EditUserDB(data)
      }

      console.log("Players: ", players)
      io.emit('players-data', players);
    })

    socket.on('players-waiting', (id) => {
      
      console.log("Jugador esperando:", id);
      if (players.player1.id === id) {
          players.player1.isWaiting = true;
      } else if (players.player2.id === id) {
          players.player2.isWaiting = true;
      }
  
      checkIfBothPlayersAreWaiting();
    });

    socket.on('waiting-screen', () => {
      io.emit("screen-change");
    });

    socket.on("generate-new-color", () => { // Escuchar una solicitud de un nuevo color
      currentColor = randomColor(); // Generar un nuevo color
      io.emit('color', currentColor); // Emitir el nuevo color a todos los clientes conectados
    });

    socket.on("send-item", (user) => {
        if (!firstPressed) {
            firstPressed = true;
            io.emit('first-player-pressed', user.name); // Emitir a todos los jugadores
        }
        
        console.log(user.name, user.score)
        socket.broadcast.emit("other-player-pressed", user.name);
    })

    socket.on('updateScore', (winner) => {
        io.emit('update-score-player', winner);

        
    });

    socket.on('calculate-winner', async()=>{
      if(players.player1.score > players.player2.score){
        io.emit('winner', players.player1.color)
        io.emit('change-to-winner', players.player1)
        console.log("Winner", players.player1.color)
      } else if (players.player2.score > players.player1.score){
        io.emit('winner', players.player2.color)
        io.emit('change-to-winner', players.player2)
        console.log("Winner", players.player2.color)
      }

      const playersList = await Firebase.getUsersDB();
      console.log("PlayerBoard", playersList)
      io.emit('table-board', playersList)
      
    })

    socket.on('disconnect', () => {
      console.log("Cliente desconectado:", socket.id);
    
      // Solo disminuye playersConnected si el cliente desconectado es un jugador
      if (socket.clientType === 'player') {
        playersConnected--;
        console.log("Jugador desconectado. Total de jugadores:", playersConnected);
      } else if (socket.clientType === 'mupi') {
        console.log("Mupi desconectado");
        // Manejo de la desconexión del mupi si es necesario
      }
    
      // Lógica para restablecer el estado del jugador basado en userId
      if (socket.userId) {
        if (players.player1.id === socket.userId) {
          players.player1 = { id: 0, name: "", birthday: "", email: "", score: 0, color: "", isWaiting: false };
        } else if (players.player2.id === socket.userId) {
          players.player2 = { id: 0, name: "", birthday: "", email: "", score: 0, color: "", isWaiting: false };
        }
      }
    });
});

function checkIfBothPlayersAreWaiting() {
  if (players.player1.isWaiting && players.player2.isWaiting) {

      setTimeout(() => {
        io.emit('go-to-main-screen');
        io.emit('start-timer');
        io.emit('color', currentColor);
      }, 3000);
      

      // Restablecer el estado de espera
      players.player1.isWaiting = false;
      players.player2.isWaiting = false;
      console.log("Ambos jugadores están esperando. Iniciando partida...");
  }
}

