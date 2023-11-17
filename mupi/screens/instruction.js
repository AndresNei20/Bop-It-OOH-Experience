export class Instructions {
  constructor(p5) {
      this.p5 = p5;
      this.ilustration = this.p5.loadImage('img/amico.png');
      this.orangeCircle = this.p5.loadImage('img/orangeCircle.png');
      this.violetCircle = this.p5.loadImage('img/violet_circle2.png');
      this.pinkCircle = this.p5.loadImage('img/pinkButton.png');
      this.yellowTriangle = this.p5.loadImage('img/yellow_triangle2.png');
      this.logoHasbro = this.p5.loadImage('img/logo_hasbro.png');
      this.background = this.p5.loadImage('../img/back_instructions.png');
      
      this.textSize = 32;
      this.textColor = 'yellow'; 
      this.textStrokeColor = 'yellow'; 

      this.customFont = p5.loadFont('/fonts/RussoOne-Regular.ttf');
  }
  show(p5) {
    p5.background('black');
    p5.image(this.background, 0, 0);
    p5.image(this.ilustration, 120, 350);
    p5.image(this.orangeCircle, 15, -130);
    p5.image(this.violetCircle, 460, 250);
    p5.image(this.pinkCircle, -50, 450);
    p5.image(this.yellowTriangle, 400, 22);
    p5.image(this.logoHasbro, 5, 730);
    

    p5.textSize(this.textSize);
    p5.fill(this.textColor);
    p5.stroke(this.textStrokeColor);
    p5.strokeWeight(1);

    p5.textFont(this.customFont);

  const centerX = p5.width / 2;
  const centerY = p5.height / 3;

  p5.textAlign(p5.CENTER, p5.CENTER);
  const instructionText ="INSTRUCTIONS:\nWhen the prompt appears\non the screen, quickly press\ncorresponding button.\nDon't get distracted!";

  p5.text(instructionText, centerX, centerY);

}
}