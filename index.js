import { Home } from './screens/Home.js';
import { Main } from './screens/Main.js';
import { Shake } from './screens/Shake.js';
import { DataUser } from './screens/DataUser.js';

let currentScore = 0; //la idea es que sea global jaja

const app = p5 => {
  let home;
  let main;
  let dataUser;
  let shake; //shake screen
  let currentScreen;

  let startingTime = 10;// el timer empezara desde 60 segundos
  let lastUpdateTime = 0;
  let currentDisplayTime = startingTime; // Tiempo que se muestra actualmente 
  let timeStarted = false; //indica si el temporizador ya esta activo
  let timerVisible = true; // Controla la visibilidad del temporizador

  let currentScore = 0; //puntuación 

  p5.setup = function() {
    p5.createCanvas(414, 896);
    dataUser = new DataUser(p5);
    home = new Home(p5, currentScreen, dataUser);
    
    shake = new Shake(p5)

    main = new Main(p5);
    currentScreen = home; 
    lastUpdateTime = p5.millis(); // Inicializa el último tiempo de actualización

    if (typeof window.DeviceOrientationEvent !== 'undefined') { //evento de orientación
      window.addEventListener('deviceorientation', shake.handleShake, false);
    }
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

    p5.textSize(32);
    p5.fill(255);
    const displayTime = p5.int(currentDisplayTime);
    p5.text(displayTime, p5.width / 2, 50);


    p5.textSize(32);//shake
    p5.fill(255);//shake
    p5.text(`Puntaje: ${currentScore}`, p5.width / 2, 50);//shake

  
    if (p5.keyIsPressed) {
      if (p5.key === '2') {
        currentScreen.hideInput();
        currentScreen = dataUser;
        currentScreen.showInput();
        console.log("Cambio a 2")
      } else if (p5.key === '3') {
        currentScreen.hideInput();
        currentScreen = main;
        timerVisible = true; // Vuelve a mostrar el temporizador
        currentScreen.showInput();
        console.log("Cambio a 3")
      }else if (p5.key === '4') {
        currentScreen.hideInput();
        currentScreen = shake;
        timerVisible = true; // Vuelve a mostrar el temporizador
        console.log("Cambio a 4")
      }
    }
  }
}

new p5(app);
