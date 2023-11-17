export class Go {
  constructor(p5) {
      this.p5 = p5;
      this.background = this.p5.loadImage('../img/back_instructions.png');
      this.textSize = 80;
      this.textColor = 'yellow'; 
      this.textStrokeColor = 'yellow';
      this.orangeCircle = this.p5.loadImage('img/orangeCircle.png');
      this.violetCircle = this.p5.loadImage('img/violet_circle2.png');
      this.pinkCircle = this.p5.loadImage('img/pinkButton.png');
      this.yellowTriangle = this.p5.loadImage('img/yellow_triangle2.png');
      this.logoHasbro = this.p5.loadImage('img/logo_hasbro.png');

      

    // Carga la fuente personalizada
    this.customFont = p5.loadFont('/fonts/RussoOne-Regular.ttf');
  }

  show(p5) {
    p5.background('black');
    p5.image(this.background, 0, 0);
    p5.image(this.orangeCircle, 15, 100);
    p5.image(this.violetCircle, 380, 250);
    p5.image(this.pinkCircle, 50, 550);
    p5.image(this.yellowTriangle, 350, 50);
    p5.image(this.logoHasbro, 5, 730);

    p5.textSize(this.textSize);
    p5.fill(this.textColor);
    p5.stroke(this.textStrokeColor);
    p5.strokeWeight(2);

    p5.textFont(this.customFont);

  const centerX = p5.width / 2;
  const centerY = p5.height / 2;

  p5.textAlign(p5.CENTER, p5.CENTER);
  const instructionText = "GO!";

  p5.text(instructionText, centerX, centerY);

}
}