const express = require('express');
const http = require("http")
const socketIO = require('socket.io');
const cors = require('cors');
const PORT = 3000


const app = express();
app.use(cors())
const server = http.createServer(app);;

server.listen(PORT, () => {
  console.table({
      'Player:': 'http://localhost:3000/player',
      'Mupi:': 'http://localhost:3000/mupi',
  });
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

let playersWaiting = 0;
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
    color: ""
  },
  player2: {
    id: 0,
    name: "",
    birthday: "",
    email: "",
    score: 0,
    color: ""
  }
};

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});


io.on('connect', (socket) => {
    console.log("Client connected:" );
    console.log("players waiting:", playersWaiting)

    let assigned = {};
    
    socket.on('player-connected', () => {
      playersWaiting++;
      console.log("players waiting:", playersWaiting)

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

    });

    

    socket.on('mupi-connected', () => {
      console.log("mupi connected")
    });
    

    socket.on('players-waiting', () => {
        console.log("players waiting:", playersWaiting )
        if (playersWaiting == 2) { 
            io.emit('go-to-main-screen');
            io.emit('start-timer');
            io.emit('color', currentColor)
            playersWaiting = 0; // Reset para próximas conexiones
        }
    });

    socket.on("generate-new-color", () => { // Escuchar una solicitud de un nuevo color
      currentColor = randomColor(); // Generar un nuevo color
      io.emit('color', currentColor); // Emitir el nuevo color a todos los clientes conectados
    });

    socket.on("send-item", (user) => {
        if (!firstPressed) {
            firstPressed = true;
            io.emit('first-player-pressed', user); // Emitir a todos los jugadores
        }
        console.log('User pressed:', user);
        socket.broadcast.emit("other-player-pressed", user);
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        console.log('Usuario desconectado:', socket.id);
        if (players.player1.id === socket.id) {
          players.player1 =
         {
          id: 0,
          name: "",
          birthday: "",
          email: "",
          score: 0,
          color: ""
        }
        playersWaiting--;
        }
        
        if (players.player2.id === socket.id) 
        { players.player2 = {
          id: 0,
          name: "",
          birthday: "",
          email: "",
          score: 0,
          color: ""
        }
        playersWaiting--;
        };

        io.emit('playersDetails', players);
    })
});

