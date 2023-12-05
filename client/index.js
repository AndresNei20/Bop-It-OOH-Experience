import {io} from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';
import { Home } from './screens/home.js';
import { Main } from './screens/main.js';
import { DataUser } from './screens/DataUser.js';
import {Scream} from './screens/scream.js'
import { Shake } from './screens/Shake.js';
import { Winner } from './screens/Winner.js';
import { Loser } from './screens/Loser.js';
import {Score} from './screens/Score.js'
import { Cupon } from './screens/Cupon.js';
import {WaitingPlayers} from './screens/waitingPlayers.js'


const app = p5 => {
  let home;
  let main;
  let dataUser;
  let waitingPlayers;
  let scream;
  let shake;
  let winner;
  let cupon;
  let loser;
  let currentScreen;
  let socket; 
  let score; 
  let currentColor;
  let pressedFirst = false;
  let winnerPlayer = "";  
  let leaders = [];
  let pressed;

  let playerData = {
    id: 0,
    name: "Anne",
    birthday: "",
    email: "",
    score: 5400,
    color: "",
    isWaiting: false,
  }
  

  //Timer
  let startingTime = 30;// el timer empezara desde 60 segundos
  let lastUpdateTime = 0;
  let currentDisplayTime = startingTime; // Tiempo que se muestra actualmente 
  let timeStarted = false; //indica si el temporizador ya esta activo
  let timerVisible = false; // Controla la visibilidad del temporizador

  let soundFiles = {
    red: 'sounds/Red.mp3',
    magenta: 'sounds/Magenta.mp3',
    yellow: 'sounds/Yellow.mp3',
    orange: 'sounds/Orange.mp3',
    bopit: 'sounds/Bopit.mp3',
    blue: 'sounds/Blue.mp3'
  };
  
  let sounds = {};

  let audioContext;
  let analyser;
  let microphone;
  let umbralDeGrito = 50;

  let onshake;
  let shakeThreshold = 15;
  let acc = 0;
  let totalAcc = 0;

  let actionSent = false;

  p5.preload = function() {
    // Cargar todos los sonidos
    for (let color in soundFiles) {
      sounds[color] = p5.loadSound(soundFiles[color]);
    }
  }
  

  p5.setup = function() {
    p5.createCanvas(414, 896);

    socket = io.connect('https://8285-200-3-193-228.ngrok-free.app', {path: '/real-time'});
    socket.emit("player-connected")

    p5.getMicrophoneInput()

     // Iniciar el contexto de audio y el analizador
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048; // Puedes ajustar este valor
    
    home = new Home(p5);
    home.setPlayCallback(() => {
      
      console.log("Cambiado a dataUser por clic en Play Now");
      currentScreen.hideInput();
      currentScreen = dataUser; 
      currentScreen.showInput();
    });

    dataUser = new DataUser(p5, playerData);
    dataUser.setSubmitCallback((userData) => {
      playerData = {
        id: playerData.id,
        name: userData.name,
        birthday: userData.birthday,
        email: userData.email,
        score: playerData.score,
        color: playerData.color,
        isWaiting : playerData.isWaiting
      }
      console.log("Datos del usuario recibidos en index.js:", playerData);

      currentScreen.hideInput();
      currentScreen = waitingPlayers; 
      currentScreen.showInput();
      if (currentScreen === waitingPlayers) {
        socket.emit('players-details', playerData)
        socket.emit('players-waiting', playerData.id);
        socket.emit('waiting-screen');
      }
    });
    
    
    waitingPlayers = new WaitingPlayers(p5);
    
    main = new Main(p5, socket, pressedFirst);
    
    scream = new Scream(p5);
    shake = new Shake(p5, playerData);
    cupon = new Cupon(p5);

    winner = new Winner(p5);
    winner.setNextCallback(() => {
      currentScreen.hideInput();
      currentScreen = score;
      currentScreen.showInput();
      console.log("Cambiado a score por clic en see results");
    });

    loser = new Loser(p5);
    loser.setNextCallback(() => {
      currentScreen.hideInput();
      currentScreen = score;
      currentScreen.showInput();
      console.log("Cambiado a score por clic en see results");
    });

    score = new Score(p5);
    score.setNextCallback(() => {
      currentScreen.hideInput();
      currentScreen = cupon;
      currentScreen.showInput();
      console.log("Cambiado a score por clic en see results");
    });

    //CURRENT SCREEN 
    currentScreen = home; 

    socket.on('assigned', (playerAsig) => {
      playerData = playerAsig;
      console.log("Color assigned:", playerData.color);
      console.log("Player", playerData);


    });

    socket.on('go-to-main-screen', () => {
        currentScreen = main;
        // Aquí puedes agregar cualquier otra lógica necesaria para cambiar de pantalla.
    });
    
    socket.on('start-timer', () => {
        if (!timeStarted && currentScreen === main) {
            timeStarted = true;
            console.log("Comienza el temporizador");
        }
    });

    socket.on('color', (color) => {
        console.log("Received color:", color);
        currentColor = color;
        actionSent = false;

          // Reproducir el sonido del color correspondiente
        if (sounds[currentColor]) {
          sounds[currentColor].play();
        }

        if (currentColor == 'scream'){
          currentScreen = scream
        } else if(currentColor == 'shake') {

          currentScreen = shake
        } else  {
          currentScreen = main
        }
      
    });

    socket.on('first-player-pressed', (user) => {
        console.log('I pressed the button first and earned points!');
        
    });
    
    socket.on('other-player-pressed', (item) => {
        console.log('Other player pressed the button first.');
    }); 

    socket.on('updateScore', (winnerPlayer) => {
      // Suponiendo que `player` y `opponent` son objetos que contienen las propiedades `id` y `score`.
      if (winnerPlayer.id === players.player1.id) {
          // Actualiza el puntaje del jugador local en la interfaz
          players.player1.score = winnerPlayer.score;
      } else if (winnerPlayer.id === players.player2.id) {
          // Actualiza el puntaje del oponente en la interfaz
          players.player2.score = winnerPlayer.score;
      }
    });

    socket.on('winner', (winner) =>{
      
      winnerPlayer = winner
      console.log("Winner", winnerPlayer)
      if(playerData.color != winner){
        console.log("I am a loser")
      } else {
        console.log("I am a winner")
      }
    })

    socket.on('pressed', (data) => {
      console.log("llega la data:" + data)
      
      console.log("boton presionado", data)
      if (currentColor == 'button') {
        console.log("Entra en la instrucción")
        console.log("Estoy comparando " + playerData.color + "con " + data)
        console.log(typeof playerData.color)
        console.log(data)

        if(data == 1){
          pressed = 'blue'
        } else if(data == 2){
          pressed = 'red'
        }

        if(playerData.color != pressed){
          console.log("Other player pressed first the arduino button")
        } else {
          console.log("You pressed first the arduino button")
          playerData.score += 100;
          socket.emit('send-item', playerData);
          socket.emit('updateScore', playerData);
          socket.emit('generate-new-color');
        }
        
      }
    })
    
    socket.on('table-board', (playersList) =>{
        leaders = playersList;
    })
  }
  
  p5.draw = function() {
    p5.background(0);
    currentScreen.show(p5);

    let volume = p5.analyzeVolume();
    /* console.log("Volume :", volume) */

    // Timer function 
    if (timeStarted) {
      const currentTime = p5.millis();
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

             //Instruction
             p5.textSize(20);
             p5.fill(255);
             p5.text(`Press the ${currentColor} button`, 100, 180);


      if (currentTime - lastUpdateTime >= 1000) {
        // Actualiza el contador de tiempo cada segundo
        if (currentDisplayTime > 0) {
          currentDisplayTime -= 1;
        } else {
          console.log("¡Tiempo agotado!");
          socket.emit('players-details', playerData)
          socket.emit('calculate-winner')
          timerVisible = false; // Oculta el temporizador
          timeStarted = false; // Detiene el temporizador
          currentDisplayTime = 0; // Asegura que el tiempo sea 0
          console.log("Antes de cambiar a winner/loser")
          console.log("Estoy comparando " + winnerPlayer + "con " + playerData.color)
          setTimeout(() => {
              if(winnerPlayer == playerData.color){
              currentScreen = winner;
              console.log("entro a winner porque winner es " + winnerPlayer)
              }else {
                console.log("entro a loser porque winner es:" + winnerPlayer)
                currentScreen = loser;
              }
              console.log("currentscreen:", currentScreen)
          }, 500);
          
          
        }
        lastUpdateTime = currentTime;
      }
    }

    
    if(currentScreen == score){
      let yOffsetCircle = 50; // Ajuste vertical para el círculo
      let yOffsetPoints = 50; // Ajuste vertical para los puntos
      let yOffsetRest = 100; // Ajuste vertical para el resto de elementos
      //Score
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textSize(32);
      p5.text(`${playerData.score}\nPoints`, p5.width / 2, 100 + yOffsetPoints);

      // Resto del contenido
      p5.textSize(24);
      p5.text(`Crazy Score\n${playerData.name}\nCongratulations!`, p5.width / 2, 250 + yOffsetRest);

      // Tabla de líderes
      p5.textSize(22);
      p5.fill(255); // Texto en blanco
      p5.text('Leader Board', p5.width / 2, 375 + yOffsetRest);

      // Obtener solo los primeros tres líderes
      const topThreeLeaders = leaders.slice(0, 3);

      let startY = 500; // Starting Y position for the leaderboard
      let rectHeight = 80; // Height of each leaderboard entry
      let padding = 10; // Padding between entries
      let colors = ['#ffcc00', '#0099cc', '#ff9900']; // Colors for 1st, 2nd

      topThreeLeaders.map((leader, index) => {
        let y = startY + (rectHeight + padding) * index;
        
        p5.fill(colors[index]);
        p5.rect(20, y, p5.width - 40, rectHeight, 20);
        
        p5.fill(0); // Text color
        p5.textSize(16); // Text size
        p5.text(`${index + 1}. ${leader.name} - ${leader.score} points`, p5.width / 2, y + rectHeight / 2);
      });
    }

    

    if(currentScreen == scream){
      
      if(volume > umbralDeGrito && !actionSent ) {
        actionSent = true;
        console.log("¡Estoy gritando!", playerData.name);
        // Mostrar algún indicador visual de que el grito fue detectado
        p5.textSize(20);
        p5.fill(255);
        p5.text(`That's what I call screaming`, 100, 120);

        setTimeout(() => {
          console.log("Esperanding")
        }, 500);
        playerData.score += 100;
        socket.emit('send-item', playerData);
        socket.emit('updateScore', playerData)
        socket.emit('generate-new-color');

      }
    }

    if(currentScreen == shake ){
      
      this.startShake();
      onshake = this.onShake.bind(this); // Enlazar el método onShake

      /* p5.text(`Acceleration X: ${acc.x}, Y: ${acc.y} Z:  ${acc.z}`,  100, 180);
      p5.text(`TotalACC: ${totalAcc}}`,  100, 220); */

      if (totalAcc > shakeThreshold && !actionSent) {
        actionSent = true;
        console.log("Shake detected!");

        // Mostrar algún indicador visual de que el grito fue detectado
        p5.textSize(20);
        p5.fill(255);
        p5.text(`That's what I call shaking`, 100, 120);

        setTimeout(() => {
          console.log("Esperanding")
        }, 500);

        playerData.score += 200;  
        socket.emit('send-item', playerData);
        socket.emit('updateScore', playerData)
        socket.emit('generate-new-color');

        
        // Aquí puedes manejar la lógica cuando se detecta una agitación
        // Por ejemplo, actualizar la puntuación o cambiar el estado del juego
    }
    }

  }

  p5.mousePressed = function () {
    currentScreen.mousePressed(playerData, currentColor);
    pressedFirst = main.getPressedFirstStatus();

  }

  p5.getMicrophoneInput = function() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then((stream) => {
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            console.log("Micrófono listo");
            // Intenta reanudar el contexto de audio
            audioContext.resume().then(() => {
                console.log("Contexto de Audio reanudado");
            });
        })
        .catch((err) => {
            console.error('Error al acceder al micrófono:', err);
        });
};

  p5.analyzeVolume = function() {
    /* console.log('Analizando volumen') */
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
  
    let sum = 0;
    for(let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    let average = sum / bufferLength;
    /* console.log('Average:', average) */
    return average; // Este es el volumen promedio
  }

  p5.onShake = function(event){
    acc = event.accelerationIncludingGravity;
    console.log("Acceleration X: ", acc.x, " Y: ", acc.y, " Z: ", acc.z);

    totalAcc = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
    console.log("Total Acceleration: ", totalAcc);

      
  }

  p5.startShake = function() {
    // Añadir event listener cuando se inicia la detección
    window.addEventListener('devicemotion', this.onShake);
    console.log("Shake detection started");
  }

  p5.stopShake = function(){
      // Remover event listener cuando ya no se necesita
      window.removeEventListener('devicemotion', this.onShake);
      console.log("Shake detection stopped");
      
  }

}

new p5(app);