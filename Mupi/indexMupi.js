
import {QRScreen} from './screens/code.js'


const app = p5 => {
    let qrScreen
    let currentScreen;
  
    let startingTime = 10;// el timer empezara desde 60 segundos
    let lastUpdateTime = 0;
    let currentDisplayTime = startingTime; // Tiempo que se muestra actualmente 
    let timeStarted = false; //indica si el temporizador ya esta activo
    let timerVisible = true; // Controla la visibilidad del temporizador
  
    p5.setup = function() {
      p5.createCanvas(1024, 1366);
      /* dataUser = new DataUser(p5); */
      lastUpdateTime = p5.millis(); // Inicializa el último tiempo de actualización
     
      qrScreen = new QRScreen(p5); // Instantiate QRScreen here, not qrScreen
      currentScreen = qrScreen; 
      
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
            currentDisplayTime = 0 | undefined; // Asegura que el tiempo sea 0
          }
          lastUpdateTime = currentTime;
        }
      }
  
      p5.textSize(32);
      p5.fill(255);
      const displayTime = p5.int(currentDisplayTime);
      p5.text(displayTime, p5.width / 2, 50);
  
    
      if (p5.keyIsPressed) {
        if (p5.key === '2') {
          currentScreen.hideInput();
          currentScreen = qrScreen;
            console.log("Cambio a 2")
       
        }
      }
    }
  }
  
  new p5(app);