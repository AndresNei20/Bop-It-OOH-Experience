export class Shake {
    constructor(p5) {
        this.p5 = p5;
        this.shakeIcons = this.p5.loadImage('img/shakeicons.png')
    }

    show(p5) {
        p5.background('black');

        p5.image(this.shakeIcons, 25,150)
    }

    hideInput(){
      
      }

      showInput(){
       
      }
      
    }
