import {io} from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';
import {Players} from './screens/playersScreen.js'
import {Instructions} from './screens/instruction.js'
import { Score } from './screens/score.js';
import { Go } from './screens/go.js';
import { Home } from './screens/home.js';

let players = {
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

const app = p5 => {
    let scoreScreen;
    let instructions;
    let playersScreen;
    let go;
    let currentScreen;
    let socket; 
    let currentColor;
    let home;

    //Timer
    let startingTime = 60;// el timer empezara desde 60 segundos
    let lastUpdateTime = 0;
    let currentDisplayTime = startingTime; // Tiempo que se muestra actualmente 
    let timeStarted = false; //indica si el temporizador ya esta activo
    let timerVisible = false; // Controla la visibilidad del temporizador

    
    p5.setup = function() {
        p5.createCanvas(600, 812);

        socket = io.connect('http://localhost:3000', {path: '/real-time'});
        socket.emit("mupi-connected");

        home = new Home(p5)
        go = new Go(p5);
        instructions = new Instructions(p5);
        playersScreen = new Players(p5);
        scoreScreen = new Score(p5);

        currentScreen = home; 

        socket.on('players-data', (data) => {
          players = data
          console.log(players)

        });

        socket.on('waiting-screen', () => {
          currentScreen = playersScreen;

        });

        socket.on('go-to-main-screen', () => {
            currentScreen = scoreScreen;

        });
      
        socket.on('start-timer', () => {
            if (!timeStarted && currentScreen === scoreScreen) {
                timeStarted = true;
                console.log("Comienza el temporizador");
            }
        });
      
        socket.on('color', (color) => {
            console.log("Received color:", color);
            currentColor = color;
        });
    
        socket.on('first-player-pressed', (user) => {
            console.log('I pressed the button first and earned points!');
            
        });
        
        socket.on('other-player-pressed', (item) => {
            console.log('Other player pressed the button first.');
        }); 

    }
    
    p5.draw = function() {
      p5.background(0);
      currentScreen.show(p5, players);

    // Timer function 
    if (timeStarted) {
      const currentTime = p5.millis();

             //Timer
             p5.fill(255, 230, 16);
             p5.ellipse(p5.width / 2, 90, 100);
             p5.textSize(50);
             p5.textStyle("BOLD");
             p5.stroke(10)
             p5.fill(0);
             const displayTime = p5.int(currentDisplayTime);
             p5.text(displayTime, p5.width / 2 + 25, 95);
       
             //Instruction
             p5.textSize(30);
             p5.fill('white')
             p5.fill(255);
             p5.text(`Press the ${currentColor} button`, p5.width / 2 + 180, 180);


      if (currentTime - lastUpdateTime >= 1000) {
        // Actualiza el contador de tiempo cada segundo
        if (currentDisplayTime > 0) {
          currentDisplayTime -= 1;
        } else {
          console.log("¡Tiempo agotado!");
          timerVisible = false; // Oculta el temporizador
          timeStarted = false; // Detiene el temporizador
          currentDisplayTime = 0; // Asegura que el tiempo sea 0
        }
        lastUpdateTime = currentTime;
      }
    }

    if(currentScreen == playersScreen){
      
      // Ajusta la posición horizontal para que el texto esté más a la izquierda
      const playerOneTextX = 90 + 10;
      // Ajusta la posición vertical para centrar el texto dentro de la caja
      const playerOneTextY = 267 + 45 / 2;
      p5.text(`${players.player1.name} `, playerOneTextX, playerOneTextY);

      // Ajusta la posición horizontal para que el texto esté más a la izquierda
      const playerTwoTextX = 90 + 10;
      // Ajusta la posición vertical para centrar el texto dentro de la caja
      const playerTwoTextY = 417 + 45 / 2;
      p5.text(`${players.player2.name} `, playerTwoTextX, playerTwoTextY);
    }

    if(currentScreen == scoreScreen){

      
      p5.textSize(20);
      // Nombre del jugador 1 (centrado) con color personalizado
      p5.stroke(`${players.player1.color} `); // Color del trazo
      p5.strokeWeight(1);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.fill(`${players.player1.color} `); // Aplica el color personalizado a JohnDoe
      p5.text(`${players.player1.name} `, p5.width / 2, 370);

      // Puntuación de jugador 1 (alineada a la derecha)
      p5.textAlign(p5.LEFT, p5.LEFT);
      p5.noStroke(); // Elimina el trazo para la puntuación
      p5.fill('white'); // Restablece el color predeterminado para la puntuación
      p5.text(`${players.player1.score} ` + " pts", p5.width / 2 + 140, 370);

      // Nombre del jugador 2 (centrado) con color personalizado
      p5.stroke(`${players.player2.color} `); // Color del trazo
      p5.strokeWeight(1);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.fill(`${players.player2.color} `); // Aplica el color personalizado al nombre de Player 2
      p5.text(`${players.player2.name} `, p5.width / 2, 460);

      // Puntuación de jugador 2 (alineada a la derecha)
      p5.textAlign(p5.LEFT, p5.LEFT);
      p5.noStroke(); // Elimina el trazo para la puntuación de "Player 2"
      p5.fill('white'); // Restablece el color predeterminado para la puntuación
      p5.text(`${players.player2.score} ` + " pts", p5.width / 2 + 140, 460);

    }
     
    }
  
  }
  
  new p5(app);