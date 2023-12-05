export class Scream {
    constructor(p5, socket, playerData) {
        this.p5 = p5;
        this.socket = socket;
        this.playerData = playerData;
        this.bolitas = this.p5.loadImage('img/bolitas.png');
        this.mic = this.p5.loadImage('img/mic.png');
        this.redLine = this.p5.loadImage('img/red_line.png');
        this.orangeLine = this.p5.loadImage('img/orange_line.png');
        this.blueLine = this.p5.loadImage('img/blue_line.png');
        this.yellowLine = this.p5.loadImage('img/yellow_line.png');

        this.customFont = this.p5.loadFont('./fonts/RussoOne-Regular.ttf');

    }

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

    }

    
    hideInput(){
    }

    showInput(){
       
    }

    mousePressed() {}

    // Otros métodos...
}