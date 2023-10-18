class Home {
    constructor() {
      this.logo = loadImage('img/logo.png');
      this.back = loadImage('img/back.png');
      this.yellowCircle = loadImage('img/yellow_circle.png');
      this.violetCircle = loadImage('img/violet_circle.png');
      this.blueCircle = loadImage('img/blue_circle.png');
      this.yellowTriangle = loadImage('img/yellow_triangle.png');
      
      this.arrow = loadImage('img/arrow.png');
      this.playButton = loadImage('img/play_button.png');
      this.playButtonX = 311;
      this.playButtonY = 70;
      this.playButtonWidth = this.playButton.width;
      this.playButtonHeight = this.playButton.height;

    }
  
    draw() {
      background('black');
      image(this.back, -120, 200);
      image(this.logo, 40, 100);
      image(this.yellowCircle, 0, 0);
      image(this.violetCircle, 320, 500);
      image(this.blueCircle, 0, 400);
      image(this.yellowTriangle, 320, 30);
      
      image(this.arrow, 140, 500);
      image(this.playButton, 110, 700);

    
  }
}
  
// pantalla2.js
class Main {
    constructor() {
        this.redButton = loadImage('img/redButton.png')
        this.blueButton = loadImage('img/blueButton.png')
        this.pinkButton = loadImage('img/pinkButton.png')
        this.orangeButton = loadImage('img/orangeButton.png')
        this.yellowRing = loadImage('img/yellowRing.png')
        this.bopitButton = loadImage('img/bopitButton.png')
    }

    draw() {
        background('black');

        image(this.redButton, 311,70)
        image(this.blueButton, 0,160,300, 230)
        image(this.pinkButton, 90,680, 150, 150)
        image(this.orangeButton, 258,620)
        image(this.yellowRing, 10,270, 400, 400)
        image(this.bopitButton, 12,335, 400, 270)
    }
      
    }

  //Esto lo agregue yo (Andres) Pantalla de Shake 
   //---------------------------------------------SHAKE ACA ABAJO----------------------------------------------
  class Shake {
    constructor(){
      this.shakeImg = loadImage('img/shakeIcons.png');
      this.shakeDuration = 20000; // Duración de la vibración en milisegundos
      this.shakeStart = 0; // Variable para almacenar el tiempo de inicio de la vibración
      this.shakeActive = false; // Variable para rastrear si la vibración está activa
    }
    
    startShake() {
      this.shakeStart = millis(); // Iniciar el temporizador de vibración
      this.shakeActive = true;
    }

    stopShake() {
      this.shakeActive = false;
    }

    draw() {
      // Verificar si la vibración está en curso
      if (this.shakeActive) {
        // Calcular una posición de sacudida aleatoria
        let x = random(-5, 5);
        let y = random(-5, 5);
  
        // Dibujar la imagen con la sacudida
        image(this.shakeImg, 25 + x, 150 + y);
      } else {
        // La vibración ha terminado, muestra la imagen en su posición original
        image(this.shakeImg, 25, 150);
      }
    }
  }
   //---------------------------------------------SHAKE ACA ARRIBA-----------------------------------
  
  // sketch.js (archivo principal)
  let home;
  let main;
  let shake
  let pantallaActual;

 //---------------------------------------------SHAKE ACA ABAJO-----------------------------------
  let puntaje = 0;
 //---------------------------------------------SHAKE ACA ARRIBA-----------------------------------------

  function setup() {
    createCanvas(414, 896);
    home = new Home();
    main = new Main();
    shake = new Shake(); //SHAKE
    pantallaActual = home; // Iniciar en la pantalla 1

  //pantalla de Shake 
 //---------------------------------------------SHAKE ACA ABAJO----------------------------------
  // Agrega el evento de orientación solo si está disponible
  if (typeof window.DeviceOrientationEvent !== 'undefined') {
    window.addEventListener('deviceorientation', handleOrientation, false);
  }
   //---------------------------------------------SHAKE AQUI ARRIBA---------------------------
}
  
  
  function draw() {
    background(0);
    pantallaActual.draw();

//pantalla de shake
 //---------------------------------------------SHAKE ACA ABAJO---------------------------------
    fill(255);
    textSize(24);
    text(`Puntaje: ${puntaje}`, 10, 30);
//---------------------------------------------SHAKE ACA ARRIBA------------------------------------

    // Lógica para cambiar entre pantallas (por ejemplo, al presionar una tecla)
    if (keyIsPressed) {
      if (key === '1') {
        pantallaActual = home;
      } else if (key === '2') {
        pantallaActual = main;
      }else if(key === '3'){
        pantallaActual = shake;
        shake.startShake();
      }
    }

  }
//pantalla de shake------------------------------------SHAKE ACA ABAJO-----------------------------
  function handleOrientation(event) {
    if (event.beta > 30) {
      puntaje += 10; // Aumenta el puntaje en 10 puntos cuando se detecta un shake
      shake.startShake(); // Inicia la vibración de la pantalla shake
    } else {
      shake.stopShake(); // Detiene la vibración cuando se detiene el shake
    }
  }
  //---------------------------------------------SHAKE ACA ARRIBA------------------------------
  