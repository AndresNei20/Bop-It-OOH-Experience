export class Main {
    constructor(p5) {
        this.p5 = p5;
        this.p5 = p5;
        this.redButton = this.p5.loadImage('img/redButton.png')
        this.blueButton = this.p5.loadImage('img/blueButton.png')
        this.pinkButton = this.p5.loadImage('img/pinkButton.png')
        this.orangeButton = this.p5.loadImage('img/orangeButton.png')
        this.yellowRing = this.p5.loadImage('img/yellowRing.png')
        this.bopitButton = this.p5.loadImage('img/bopitButton.png')
    }

    show(p5) {
        p5.background('black');

        p5.image(this.redButton, 311,70)
        p5.image(this.blueButton, 0,160,300, 230)
        p5.image(this.pinkButton, 90,680, 150, 150)
        p5.image(this.orangeButton, 258,620)
        p5.image(this.yellowRing, 10,270, 400, 400)
        p5.image(this.bopitButton, 12,335, 400, 270)
    }

    hideInput(){
      
      }

      showInput(){
       
      }
      
    }
