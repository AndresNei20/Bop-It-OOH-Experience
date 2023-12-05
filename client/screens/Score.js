export class Score {
    constructor(p5) {
        this.p5 = p5;
        this.points = 2500; // La puntuación actual del jugador
        this.playerName = "Andres Pro"; // El nombre del jugador

        this.yOffsetCircle = 50; // Ajuste vertical para el círculo
        this.yOffsetPoints = 50; // Ajuste vertical para los puntos
        this.yOffsetRest = 100; // Ajuste vertical para el resto de elementos
        this.violetDonut = this.p5.loadImage('img/donut_violet.png');
        this.nextButton = this.p5.createButton('Next');
        this.nextButton.position(340, 800);
        this.nextButton.mousePressed(this.handleNextPressed.bind(this));

        this.customFont = this.p5.loadFont('./fonts/RussoOne-Regular.ttf');

        this.hideInput();
    }

    setNextCallback(callback) {
        this.nextCallback = callback;
      }
  
    handleNextPressed() {
          if (this.nextCallback) {
              this.nextCallback();
          }
    }


    show() {
        this.p5.background(0); // Fondo negro

        this.p5.image(this.violetDonut, this.p5.width / 2 - 95, 50, 200, 200) 
        this.nextButton.show();

        //Rectángulo blanco
        this.p5.fill(255);
        this.p5.rect(this.p5.width / 2 - 170, 450, 340, 300);
    }

    hideInput() {
        this.nextButton.hide();
    }

    showInput() {
        this.nextButton.show();
    }

    mousePressed() {}
}