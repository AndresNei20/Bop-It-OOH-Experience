export class Home {
    constructor(p5) {
        this.p5 = p5;
        this.logo = this.p5.loadImage('img/logo.png');
        this.back = this.p5.loadImage('img/back.png');
        this.yellowCircle = this.p5.loadImage('img/yellow_circle.png');
        this.violetCircle = this.p5.loadImage('img/violet_circle.png');
        this.blueCircle = this.p5.loadImage('img/blue_circle.png');
        this.yellowTriangle = this.p5.loadImage('img/yellow_triangle.png');
        
        this.arrow = this.p5.loadImage('img/arrow.png');
        this.playButton = this.p5.createButton('Play Now');
        this.playButton.position(this.p5.windowWidth / 2 - 50, this.p5.windowHeight / 2 + 60);
        this.playButton.mousePressed(this.navigate);

        this.hideInput();

    }
  
    show(p5) {
      p5.background('black');
      p5.image(this.back, -120, 200);
      p5.image(this.logo, 40, 100);
      p5.image(this.yellowCircle, 0, 0);
      p5.image(this.violetCircle, 320, 500);
      p5.image(this.blueCircle, 0, 400);
      p5.image(this.yellowTriangle, 320, 30);
      p5.image(this.arrow, 140, 500);
      //p5.image(this.playButton, 110, 700);

      this.playButton.show();

    
  }

  hideInput(){
    this.playButton.hide();
  }

  showInput(){
    this.playButton.show();
  }

}
