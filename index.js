import {io} from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';
import { Home } from './screens/home.js';
import { Main } from './screens/main.js';
import { DataUser } from './screens/DataUser.js';
import {Scream} from './screens/scream.js'
import { Shake } from './screens/Shake.js';
import {WaitingPlayers} from './screens/waitingPlayers.js'


const app = p5 => {
  let home;
  let main;
  let dataUser;
  let waitingPlayers;
  let scream;
  let shake;
  let currentScreen;
  let socket;  
  let pressedFirst = false;  

  let playerData = {
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
  let timerVisible = true; // Controla la visibilidad del temporizador

  p5.setup = function() {
    p5.createCanvas(414, 896);
    
    socket = io.connect('http://localhost:3000');
    
    home = new Home(p5);
    home.setPlayCallback(() => {
      currentScreen.hideInput();
      currentScreen = dataUser;
      currentScreen.showInput();
      console.log("Cambiado a DataUser por clic en Play");
    });

    dataUser = new DataUser(p5);
    dataUser.setSubmitCallback((userData) => {
      console.log("Datos del usuario recibidos en index.js:", userData);
      playerData = userData

      currentScreen.hideInput();
      currentScreen = waitingPlayers; 
      currentScreen.showInput();
    });

    main = new Main(p5, socket, pressedFirst);
    waitingPlayers = new WaitingPlayers(p5);
    scream = new Scream(p5);
    shake = new Shake(p5);
    currentScreen = main; 
    
    //Timer init
    lastUpdateTime = p5.millis(); // Inicializa el último tiempo de actualización

    if (typeof window.DeviceOrientationEvent !== 'undefined') { //evento de orientación
      window.addEventListener('deviceorientation', shake.handleShake, false);
    }


    socket.on('two-players-connected', () => {
        console.log('Dos jugadores conectados. Cambiando a pantalla Main.');
      
        currentScreen.hideInput();
        currentScreen = main;
        currentScreen.showInput();
      });

    socket.on('other-player-pressed', (item) => {
      console.log('Other player pressed the button first.');
      pressedFirst = false;
    });

  
  }
  
  p5.draw = function() {
    p5.background(0);
    currentScreen.show(p5);

    if (currentScreen === main && !timeStarted) {
      // Inicia el temporizador cuando currentScreen sea igual a main y no se haya iniciado antes
      timeStarted = true;
      console.log("Comienza el temporizador");
    }

    // Timer function 
    if (timeStarted) {
      const currentTime = p5.millis();
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

    //Timer
    p5.fill(255, 230, 16);
    p5.ellipse(210, 65, 90);
    p5.textSize(35);
    p5.textStyle("BOLD");
    p5.stroke(10)
    p5.fill(0);
    const displayTime = p5.int(currentDisplayTime);
    p5.text(displayTime, 191, 77);

    //Score
    
    p5.textSize(28);//shake
    p5.fill(255);//shake
    p5.text(`Score: ${playerData.score}`, 150, 150);//shake


  
  }



  p5.mousePressed = function () {
    currentScreen.mousePressed(pressedFirst, playerData);

    // Enviar los datos del usuario al servidor
    if (currentScreen === main && pressedFirst) {
      socket.emit('send-item', user);
    }
  }

}

new p5(app);


  

