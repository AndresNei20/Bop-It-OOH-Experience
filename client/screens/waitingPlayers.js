export class WaitingPlayers {

    constructor(p5) {
        this.p5 = p5;
        this.logo = this.p5.loadImage('img/logo.png');
        this.back = this.p5.loadImage('img/back.png');
        this.yellowCircle = this.p5.loadImage('img/yellow_circle.png');
        this.violetCircle = this.p5.loadImage('img/violet_circle.png');
        this.blueCircle = this.p5.loadImage('img/blue_circle.png');
        this.yellowTriangle = this.p5.loadImage('img/yellow_triangle.png');

        this.customFont = this.p5.loadFont('./fonts/RussoOne-Regular.ttf');
    }

    show(p5){
        p5.background('black');
        p5.image(this.back, -120, 200);
        p5.image(this.logo, 40, 100);
        p5.image(this.yellowCircle, 0, 0);
        p5.image(this.violetCircle, 320, 500);
        p5.image(this.blueCircle, 0, 400);
        p5.image(this.yellowTriangle, 320, 30);

        p5.textFont(this.customFont);

        p5.textSize(30);
        p5.fill(250);
        p5.text('Waiting players...', 100, 380);
    }

    hideInput(){

    }
  
    showInput(){
  
    }

    mousePressed(){

    }
  



}