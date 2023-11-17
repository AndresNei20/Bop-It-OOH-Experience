export class Ending {
  constructor(p5) {
      this.p5 = p5;
      this.prime = this.p5.loadImage('img/prime.png');
      this.logoHasbro = this.p5.loadImage('img/logo_hasbro.png');
      this.background = this.p5.loadImage('../img/back_ending.png');
      
      this.textSize = 60;
      this.textColor = 'yellow'; 
      this.textStrokeColor = 'yellow'; 

      this.customFont = p5.loadFont('/fonts/RussoOne-Regular.ttf');
  }
  show(p5) {
    p5.background('black');
    p5.image(this.background, 0, 0);
    p5.image(this.prime, 150, 400);
    p5.image(this.logoHasbro, 5, 730);
    

    p5.textSize(this.textSize);
    p5.fill(this.textColor);
    p5.stroke(this.textStrokeColor);
    p5.strokeWeight(1);

    p5.textFont(this.customFont);

  const centerX = p5.width / 2; 
  const centerY = p5.height / 2.7;

  p5.textAlign(p5.CENTER, p5.CENTER);
  const instructionText ="The game is\nOVER";

  p5.text(instructionText, centerX, centerY);

}
}