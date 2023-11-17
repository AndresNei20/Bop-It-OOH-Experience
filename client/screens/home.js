export class Home {
  constructor(p5) {
      this.p5 = p5;
      this.logo = this.p5.loadImage('img/logo.png');
      this.back = this.p5.loadImage('img/back.png');
      this.yellowCircle = this.p5.loadImage('img/yellow_circle.png');
      this.violetCircle = this.p5.loadImage('img/violet_circle.png');
      this.blueCircle = this.p5.loadImage('img/blue_circle.png');
      this.yellowTriangle = this.p5.loadImage('img/yellow_triangle.png');

      this.customFont = p5.loadFont('/fonts/RussoOne-Regular.ttf');
      
      this.arrow = this.p5.loadImage('img/arrow.png');
      this.playButton = this.p5.createButton('Play Now');
      this.playButton.position(130, 620);

      this.playButton.style('background-color', 'yellow');
      this.playButton.style('font-family', 'RussoOne-Regular');

    this.playButton.style('border-radius', '10px');
    this.playButton.style('padding', '15px 30px'); // Ajustar el tamaño del botón
    this.playButton.style('text-align', 'center');
    this.playButton.style('text-decoration', 'none');
    this.playButton.style('display', 'inline-block');
    this.playButton.style('font-size', '24px'); // Ajustar el tamaño del texto

      this.hideInput();

  }

  setPlayCallback(callback) {
    this.playCallback = callback;
  }

  handlePlayPressed() {
      if (this.playCallback) {
          this.playCallback();
      }
  }

  show(p5) {
    p5.background('black');
    p5.image(this.back, -120, 200);
    p5.image(this.logo, 30, 100);
    p5.image(this.yellowCircle, 0, 0);
    p5.image(this.violetCircle, 320, 500);
    p5.image(this.blueCircle, 0, 400);
    p5.image(this.yellowTriangle, 320, 30);
    p5.image(this.arrow, 150, 500);

    p5.textFont(this.customFont);


    this.playButton.show();

  
}

hideInput(){
  this.playButton.hide();
}

showInput(){
  this.playButton.show();
}

mousePressed(){
  
}

}
