export class Winner {

    constructor(p5) {
        this.p5 = p5;
        this.back = this.p5.loadImage('img/back_blue.png');
        this.bolitas =  this.p5.loadImage('img/bolitas_blue.png')
        this.nextButton = this.p5.createButton('SEE RESULTS');
        this.nextButton.position(160, 463);
        this.nextButton.mousePressed(this.handleResultsPressed.bind(this));

        this.hideInput();
    }

    show(p5){
        p5.background('black');
        p5.image(this.bolitas, 30, 100);
        p5.image(this.bolitas, 30, 100);
        p5.image(this.back, -60, 120);

        p5.fill(4, 157, 214);
        p5.rect(60, 300, 295, 210);

        p5.fill(26, 26, 26);
        p5.rect(85, 440, 245, 50);

        p5.textSize(25);
        p5.fill(250);
        p5.noStroke()

        p5.text('CONGRATS', 140, 350);
        p5.text('YOU ARE', 150, 380);
        p5.text('AMAZING', 150, 410);

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