export class Main {
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