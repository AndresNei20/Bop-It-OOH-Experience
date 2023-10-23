export class scoreScreen {
    constructor(p5) {
        this.p5 = p5;
        this.back = this.p5.loadImage('img/backsimple.png');
        this.title = this.p5.text('Score');
        this.player1 = this.p5.text('Player 1');
        this.name1 = this.p5.text('Andres');
        this.player2 = this.p5.text('Player 2');
        this.name2 = this.p5.text('Paola');
        this.score1 = this.p5.text('200');
        this.points = this.p5.text('points');
        this.score2 = this.p5.text('400');
        this.points = this.p5.text('points');
        this.count = this.p5.text('60');
        this.secSubt = this.p5.text('secs');
        

    }
  
    show(p5) {
      p5.background('black');
      p5.image(this.back, -120, 200);
      p5.text(this.title, 40, 100);
      p5.text(this.player1, 40, 100);
      p5.text(this.name1, 0, 0);
      p5.text(this.player2, 40, 100);
      p5.text(this.name2, 0, 0);
      p5.text(this.score1, 40, 100);
      p5.text(this.points, 0, 0);
      p5.text(this.score2, 40, 100);
      p5.text(this.points, 0, 0);
      p5.text(this.count, 40, 100);
      p5.text(this.secSubt, 0, 0);
     
      //p5.image(this.playButton, 110, 700);

    }
}
