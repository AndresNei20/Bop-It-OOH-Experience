let mic;
let amplitudeThreshold = 0.5; // Ajusta según sea necesario para detectar gritos
let isScreaming = false;

export class Scream {
    constructor(p5) {
        this.p5 = p5;
        this.bolitas = this.p5.loadImage('img/bolitas.png');
        this.mic = this.p5.loadImage('img/mic.png');
        this.redLine = this.p5.loadImage('img/red_line.png');
        this.orangeLine = this.p5.loadImage('img/orange_line.png');
        this.blueLine = this.p5.loadImage('img/blue_line.png');
        this.yellowLine = this.p5.loadImage('img/yellow_line.png');
        
        /* mic = new p5.AudioIn();
        mic.start(); */
    }

    /* getVolume() {
        let volume = mic.getLevel();
        
        // Comprobar si la amplitud supera el umbral
        if (volume > amplitudeThreshold) {
            isScreaming = true;
        } else {
            isScreaming = false;
        } 
    } */
  
    show(p5) {
        p5.background('black');

        p5.image(this.bolitas, 30, 100);

        // Círculo morado 
        p5.fill(89, 20, 179);
        p5.ellipse(207, 900, 410);

        p5.image(this.redLine, 114, 370);
        p5.image(this.orangeLine, 145, 420);
        p5.image(this.blueLine, 80, 310);
        p5.image(this.yellowLine, 44, 240);
        p5.image(this.mic, 120, 500);

        /* // Comprobar el volumen del micrófono
        this.getVolume();

        // Mostrar el mensaje si es necesario
        if (isScreaming) {
            p5.fill(255, 0, 0);  // Color rojo para el mensaje
            p5.textSize(24);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.text('¡Estás gritando!', p5.width / 2, p5.height / 2);
        }
       */

    
  }

  hideInput(){

  }

  showInput(){

  }

  mousePressed(){

  }

}
