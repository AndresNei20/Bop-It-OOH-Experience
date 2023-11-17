export class Score {

    constructor(p5) {
        this.p5 = p5;
        this.bolitas =  this.p5.loadImage('img/bolitas.png')
        this.nextButton = this.p5.createButton('Next');
        this.nextButton.position(340, 750);
        this.nextButton.mousePressed(this.handleNextPressed.bind(this));

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

    show(p5){
        p5.background('black');
        p5.image(this.bolitas, 30, 100);

        p5.textSize(20);
        p5.fill(255);
        p5.text('Points', 188, 265);

        p5.textSize(16);
        p5.text('Crazy Score', 175, 365);

        p5.textSize(13);
        p5.text('¡Congratulations!', 167, 416);

        p5.fill(250);
        p5.rect(32, 478, 350, 250);

        this.nextButton.show();

    }

    hideInput(){
        this.nextButton.hide();
    }
  
    showInput(){
        this.nextButton.show();
    }
  
    mousePressed(){
  
    }
}
