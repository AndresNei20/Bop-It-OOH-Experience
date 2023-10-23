export class countdownScreen {
    constructor(p5) {
        this.p5 = p5;
        this.back = this.p5.loadImage('img/backsimple.png');
        this.count = this.p5.text('GO');
        
    
    }
  
    show(p5) {
      p5.background('black');
      p5.image(this.back, -120, 200);
      p5.text(this.count, 40, 100);
    
      //p5.image(this.playButton, 110, 700);

    }
}
