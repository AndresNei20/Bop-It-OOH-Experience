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

  p5.setup = function() {
    p5.createCanvas(414, 896);
    home = new Home(p5);
    dataUser = new DataUser(p5);
    main = new Main(p5);
    scream = new Scream(p5);
    currentScreen = scream; 
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
    currentScreen.mousePressed();
}
}

new p5(app);

  

  

