const express = require('express');
const http = require("http")
const cors = require('cors');
const PORT = 3000


const app = express();
app.use(cors())
const server = http.createServer(app);;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
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
let colors = ['red', 'magenta', 'yellow', 'bopIt', 'orange', 'blue'];
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


io.on('connect', (socket) => {
    console.log("Client connected:" );
    
    console.log("players connected:", playersConnected)

    socket.on('mupi-connected', () => {
      console.log("mupi connected")
    });
    
    socket.on('player-connected', () => {
      playersConnected++;
      console.log("players connected:", playersConnected)

      if (!players.player1.id) {
          players.player1.id = socket.id;
          players.player1.color = "blue";
          assigned = players.player1;
      } else if (!players.player2.id) {
          players.player2.id = socket.id;
          players.player2.color = "red";
          assigned = players.player2;
      }

      // Envía el nombre asignado al cliente
      console.log('assigned', assigned)
      socket.emit('assigned', assigned);
      console.log(players)

    });
    
    socket.on('players-details', (data) => {
      if (data.id == players.player1.id) {
        players.player1 = data;
      } else if(data.id == players.player2.id) {
        players.player2 = data;
      }

      console.log("Players: ", players)
      io.emit('players-data', players);
    })

    socket.on('players-waiting', () => {
      
      console.log("Jugador esperando:", socket.id);
      
  
      if (players.player1.id === socket.id) {
          players.player1.isWaiting = true;
      } else if (players.player2.id === socket.id) {
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

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
      if (players.player1.id === socket.id || players.player2.id === socket.id) { 
          if (players.player1.id === socket.id) {
            players.player1 =
           {
            id: 0,
            name: "",
            birthday: "",
            email: "",
            score: 0,
            color: "",
            isWaiting: false,
          }
          }
          
          if (players.player2.id === socket.id) 
          { players.player2 = {
            id: 0,
            name: "",
            birthday: "",
            email: "",
            score: 0,
            color: "",
            isWaiting: false,
          }
          };

          playersConnected--;
          console.log("Jugador desconectado. Total de jugadores:", playersConnected);
      } else {
          console.log("Mupi desconectado");
          // Código para manejar la desconexión del mupi...
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

