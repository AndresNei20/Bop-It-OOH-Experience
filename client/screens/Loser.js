
export class Loser {

    constructor(p5) {
        this.p5 = p5;
        this.back = this.p5.loadImage('img/back_red.png');
        this.bolitas =  this.p5.loadImage('img/bolitas_red.png')
        this.nextButton = this.p5.createButton('SEE RESULTS');
        this.nextButton.position(155, 458);
        this.nextButton.style('background-color', '#1A1A1A');
        this.nextButton.style('color', 'white');
        this.nextButton.style('border', 'none');
        this.nextButton.mousePressed(this.handleResultsPressed.bind(this));
        this.customFont = this.p5.loadFont('./fonts/RussoOne-Regular.ttf');

        this.hideInput();
    }

    show(p5){
        p5.background('black');
        p5.image(this.bolitas, 30, 100);
        p5.image(this.back, -60, 120);

        p5.fill(202, 18, 18);
        p5.rect(60, 300, 295, 210);

        p5.fill(26, 26, 26);
        p5.rect(85, 440, 245, 50);

        p5.textFont(this.customFont);

        p5.textSize(25);
        p5.fill(250);
        p5.text('OH NO', 165, 360);
        p5.text('YOU LOST', 145, 390);

        this.nextButton.show();
    }

    setNextCallback(callback) {
        this.nextCallback = callback;
      }
  
    handleResultsPressed() {
          if (this.nextCallback) {
              this.nextCallback();
          }
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
