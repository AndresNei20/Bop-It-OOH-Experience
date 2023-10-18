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

  //paola - pantalla scream

  class Scream {

    constructor (){
      this.elipse = loadImage('img/yellowElipse.png');
      this.purpleCircle = loadImage('img/semicirclep.png');
      this.number = loadImage('img/1.png');
      this.backgroundSplash = loadImage('img/purplesplurt.png');
      this.microphone = loadImage('img/mic.png');
      this.scream = loadImage('img/scream.png');

    }

    draw(){
      background('black');

        image(this.elipse, 157,8,100,95)
        image(this.purpleCircle, 102,20,210,110)
        image(this.number, 196,35, 15, 30)
        image(this.backgroundSplash, 20,30)
        image(this.scream, -10,670, 430, 224)
        image(this.microphone, 110,410, 200, 300)
       


    }

  }

  class Turn {

    constructor (){
      this.elipse = loadImage('img/yellowElipse.png');
      this.purpleCircle = loadImage('img/semicirclep.png');
      this.number = loadImage('img/1.png');
      this.backgroundSplash = loadImage('img/purplesplurt.png');
      this.bigArrow = loadImage('img/bigarrow.png');
      this.turn = loadImage('img/turn.png');
      this.blueArrow = loadImage('img/bluearrow.png');
      this.redArrow = loadImage('img/redarrow.png');
      this.purpleArrow = loadImage('img/purplearrow.png');

    }

    draw(){
      background('black');

// margin left / margin top / width / height

        image(this.elipse, 157,8,100,95)
        image(this.purpleCircle, 102,20,210,110)
        image(this.number, 196,35, 15, 30)
        image(this.backgroundSplash, 20,30)
        image(this.bigArrow, 0,255, 400, 400)
        image(this.turn, 110,494, 185, 100)
        image(this.blueArrow, 50,220, 180, 150)
        image(this.redArrow, 50,600, 150, 150)
        image(this.purpleArrow, 334,570, 80, 80)
       


    }

  }



  
  // sketch.js (archivo principal)
  let home;
  let main;
  let pantallaActual;

  
  let scream; // pantalla scream pao
  let turn; // pantalla turn pao

  function setup() {
    createCanvas(414, 896);
    home = new Home();
    main = new Main();
    scream = new Scream(); // iniciar pantalla scream
    turn = new Turn(); //iniciar turn pao
    pantallaActual = home; // Iniciar en la pantalla 1
  }
  
  function draw() {
    background(0);
    pantallaActual.draw();
  
    // Lógica para cambiar entre pantallas (por ejemplo, al presionar una tecla)
    if (keyIsPressed) {
      if (key === '1') {
        pantallaActual = home;
      } else if (key === '2') {
        pantallaActual = main;
      }
      else if (key === '4') {
        pantallaActual = scream;
      } // pantalla 4 scream

      else if (key === '5') {
        pantallaActual = turn;
      } // pantalla 5 turn
    }
  }

