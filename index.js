import {io} from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';
import { Home } from './screens/home.js';
import { Main } from './screens/main.js';
import { DataUser } from './screens/DataUser.js';
import {Scream} from './screens/scream.js'


const app = p5 => {
  let home;
  let main;
  let dataUser;
  let scream;
  let currentScreen;
  let socket;  
  let pressedFirst = false;  

  p5.setup = function() {
    p5.createCanvas(414, 896);
    
    socket = io.connect('http://localhost:3000');


    home = new Home(p5);
    dataUser = new DataUser(p5);
    main = new Main(p5, socket, pressedFirst);
    scream = new Scream(p5);
    currentScreen = home; 

      // Configuración de socket.io
      
      //socket = io();

      socket.on('other-player-pressed', (item) => {
        console.log('Other player pressed the button first.');
        pressedFirst = false;
      });
  }
  
  p5.draw = function() {
    p5.background(0);
    currentScreen.show(p5);
  
    if (p5.keyIsPressed) {
      if (p5.key === '2') {
        currentScreen.hideInput();
        currentScreen = dataUser;
        currentScreen.showInput();
        console.log("Cambio a 2")
      } else if (p5.key === '3') {
        currentScreen.hideInput();
        currentScreen = main;
        currentScreen.showInput();
        console.log("Cambio a 3")
      }
  }
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

  

  

