export class QRScreen {
    constructor(p5) {
        this.p5 = p5;
        this.back = this.p5.loadImage('img/backmopi.png');
        this.logo = this.p5.loadImage('img/logo.png');
        this.code = this.p5.loadImage('img/qr.png');
        
        
        this.hideInput();

    }
  
    show(p5) {
      p5.background('black');
      p5.image(this.back, -120, 200);
      p5.image(this.logo, 40, 100);
      p5.image(this.code, 0, 0);
     
      //p5.image(this.playButton, 110, 700);

    }
}
