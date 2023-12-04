export class Home {
  constructor(p5) {
      this.p5 = p5;
      this.logo = this.p5.loadImage('img/logo.png');
      this.back = this.p5.loadImage('img/back.png');
      this.yellowCircle = this.p5.loadImage('img/yellow_circle.png');
      this.violetCircle = this.p5.loadImage('img/violet_circle2.png');
      this.blueCircle = this.p5.loadImage('img/blue_circle.png');
      this.yellowTriangle = this.p5.loadImage('img/yellow_triangle2.png');
      this.yellowTriangle2 = this.p5.loadImage('img/yellow_triangle3.png');
      this.orangeCircle = this.p5.loadImage('img/orange_circle.png');
      this.logoHasbro = this.p5.loadImage('img/logo_hasbro.png');
      this.qr = this.p5.loadImage('img/qr.jpeg');

      this.arrow = this.p5.loadImage('img/arrow.png');

  }


  show(p5) {
    p5.background('black');
    p5.image(this.back, -30, 160);
    p5.image(this.logo, 150, 100);
    p5.image(this.yellowCircle, 5, 0);
    p5.image(this.violetCircle, 350, 210);
    p5.image(this.blueCircle, 0, 300);
    p5.image(this.yellowTriangle, 350, 22);
    p5.image(this.yellowTriangle2, 10, 500);
    p5.image(this.orangeCircle, 250, 710);
    p5.image(this.logoHasbro, 5, 730);
    p5.image(this.arrow, 260, 320);
    p5.image(this.qr, 220, 420, 200, 200);
  
}

}
