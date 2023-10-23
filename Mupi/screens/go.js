export class Go {
    constructor(p5) {
        this.p5 = p5;
        this.background = this.p5.loadImage('../img/back_instructions.png');
        this.textSize = 32;
        this.textColor = 'yellow'; 
        this.textStrokeColor = 'yellow'; 

    }
    show(p5) {
      p5.background('black');
      p5.image(this.background, 0, 0);

      p5.textSize(this.textSize);
      p5.fill(this.textColor);
      p5.stroke(this.textStrokeColor);
      p5.strokeWeight(2);

    const centerX = p5.width / 2;
    const centerY = p5.height / 2;

    p5.textAlign(p5.CENTER, p5.CENTER);
    const instructionText = "GO!";

    p5.text(instructionText, centerX, centerY);

  }
}