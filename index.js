import {io} from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';
import { Home } from './screens/home.js';
import { Main } from './screens/main.js';
import { DataUser } from './screens/DataUser.js';
import {Scream} from './screens/scream.js'
import {WaitingPlayers} from './screens/waitingPlayers.js'

const app = p5 => {
  let home;
  let main;
  let dataUser;
  let waitingPlayers;
  let scream;
  let currentScreen;
  let socket;  
  let pressedFirst = false;  

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

      currentScreen.hideInput();
      currentScreen = waitingPlayers; 
      currentScreen.showInput();
    });

    main = new Main(p5, socket, pressedFirst);
    waitingPlayers = new WaitingPlayers(p5);
    scream = new Scream(p5);
    currentScreen = home; 
    


      socket.on('other-player-pressed', (item) => {
        console.log('Other player pressed the button first.');
        pressedFirst = false;
      });
  }
  
  p5.draw = function() {
    p5.background(0);
    currentScreen.show(p5);
  
  }



  p5.mousePressed = function () {
    currentScreen.mousePressed(pressedFirst);

    // Enviar los datos del usuario al servidor
    if (currentScreen === main && pressedFirst) {
      socket.emit('send-item', user);
    }
  }

}

new p5(app);

  

  

