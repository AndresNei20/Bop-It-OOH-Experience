export class Score {
    constructor(p5) {
        this.p5 = p5;
        this.points = 2500; // La puntuación actual del jugador
        this.playerName = "Andres Pro"; // El nombre del jugador

        this.yOffsetCircle = 50; // Ajuste vertical para el círculo
        this.yOffsetPoints = 50; // Ajuste vertical para los puntos
        this.yOffsetRest = 100; // Ajuste vertical para el resto de elementos
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

        const yOffsetCircle = this.yOffsetCircle; // Ajuste vertical para el círculo
        const yOffsetPoints = this.yOffsetPoints; // Ajuste vertical para los puntos
        const yOffsetRest = this.yOffsetRest; // Ajuste vertical para el resto de elementos

        // Dibuja el círculo y la puntuación
        this.p5.fill(128, 0, 128); // Color púrpura para el círculo
        this.p5.ellipse(this.p5.width / 2, 100 + yOffsetCircle, 200, 200);
        this.p5.fill(255); // Color del texto blanco

        this.nextButton.show();
    }

    hideInput() {
        this.nextButton.hide();
    }

    showInput() {
        this.nextButton.show();
    }

    mousePressed() {}
}