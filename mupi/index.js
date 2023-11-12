import {io} from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';
import {Players} from './screens/playersScreen.js'
import {Instructions} from './screens/instruction.js'
import { Score } from './screens/score.js';
import { Go } from './screens/go.js';


const app = p5 => {
    let scoreScreen;
    let instructions;
    let playersScreen;
    let go;
    let currentScreen;
    let socket; 
    let currentColor;

    let player1 = {
        name: "",
        birthday: "",
        email: "",
        score: 0
    };

    let player2 = {
        name: "",
        birthday: "",
        email: "",
        score: 0
    };

    //Timer
    let startingTime = 60;// el timer empezara desde 60 segundos
    let lastUpdateTime = 0;
    let currentDisplayTime = startingTime; // Tiempo que se muestra actualmente 
    let timeStarted = false; //indica si el temporizador ya esta activo
    let timerVisible = false; // Controla la visibilidad del temporizador

    
    p5.setup = function() {
        p5.createCanvas(600, 812);

        socket = io.connect('http://localhost:3000');

        go = new Go(p5);
        instructions = new Instructions(p5);
        playersScreen = new Players(p5);
        scoreScreen = new Score(p5);

        currentScreen = scoreScreen; 

        socket.on('go-to-main-screen', () => {
            currentScreen = scoreScreen;
          // Aquí puedes agregar cualquier otra lógica necesaria para cambiar de pantalla.
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
      currentScreen.show(p5, player1, player2);

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
             p5.text(displayTime, p5.width / 2 - 26, 95);
       
             //Instruction
             p5.textSize(30);
             p5.fill(255);
             p5.text(`Press the ${currentColor} button`, p5.width / 2 - 180, 180);


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
     
    }
  
  }
  
  new p5(app);