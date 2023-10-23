export class welcomeScreen {
    constructor(p5) {
        this.p5 = p5;
        this.back = this.p5.loadImage('img/backsimple.png');
        this.title = this.p5.text('Welcome');
        this.follow = this.p5.text('Follow the instructions on your phone to continue');
    
        

    }
  
    show(p5) {
      p5.background('black');
      p5.image(this.back, -120, 200);
      p5.text(this.title, 40, 100);
      p5.text(this.follow, 40, 100);
    
     
      //p5.image(this.playButton, 110, 700);

    }
}
