const user = {
    name: "anne",
    score: 0
}

export class Main {
    constructor(p5) {
        this.p5 = p5;
        this.p5.noStroke();
        this.bopItImg = this.p5.loadImage('img/logo.png')
        this.colors = ['red', 'magenta', 'yellow', 'bopIt', 'orange', 'blue'];
        this.currentColor = this.randomColor();
        
    }

    isOverCircle(x, y, r) {
        let distance = this.p5.dist(this.p5.mouseX, this.p5.mouseY, x, y);
        return distance < r;
    }
    
    isOverRect(x, y, w, h) {
        return this.p5.mouseX > x && this.p5.mouseX < x + w && this.p5.mouseY > y && this.p5.mouseY < y + h;
    }
    
    isOverDonut(x, y, outerR, innerR) {
        let distance = this.p5.dist(this.p5.mouseX, this.p5.mouseY, x, y);
        return distance < outerR && distance > innerR;
    }
    
    mouseIsOverShape() {
        // Botón rojo
        if (this.isOverCircle(415, 220, 75)) {
            return 'red';
        }
        // Botón magenta
        if (this.isOverCircle(165, 770, 50)) {
            return 'magenta';
        }
        // Botón bop It
        if (this.isOverCircle(210, 500, 125)) {
            return 'bopIt';
        }
        // Botón central amarillo
        if (this.isOverDonut(210, 500, 190, 150)) {
            return 'yellow';
        }
        // Botón naranja
        if (this.isOverRect(265, 630, 150, 175) && !this.isOverCircle(210, 500, 240)) {
            return 'orange';
        }
        // Botón azul
        if (this.isOverRect(0, 200, 290, 250) && !this.isOverCircle(210, 500, 240)) {
            return 'blue';
        }
        return null;
    }

    randomColor() {
        const index = Math.floor(Math.random() * this.colors.length);
        return this.colors[index];
    }

    showInstruction(p5) {
        p5.fill(255); 
        p5.textSize(24);
        p5.text(`Score: ${user.score} `, 20, 40);

        p5.text(`¡Press ${this.currentColor} button!`, 90, 130); // Muestra el mensaje en la esquina superior izquierda
    }

    mousePressed() {
        const shapePressed = this.mouseIsOverShape();

        if (shapePressed === this.currentColor) {
            console.log('Correct button pressed!');
            user.score = user.score + 100
            // Puedes hacer algo más aquí si lo deseas, como incrementar una puntuación o similar
            this.currentColor = this.randomColor(); // Genera un nuevo color para el próximo desafío
        } else {
            console.log('Wrong button pressed.');
            // Aquí puedes manejar el caso de que el usuario presione el botón incorrecto, si lo deseas
        }
    }

    show(p5) {
        p5.background('black');
        this.showInstruction(p5);

        // Botón naranja (Rectángulo) 
        p5.fill(253, 137, 2);
        p5.rect(265, 630, 150, 175);
        
        //Botón azul (Rectángulo)
        p5.fill(4, 157, 214);
        p5.rect(0, 200, 290, 250);

        //Circulo para quitarle al botón azul y naranja
        p5.fill( 0);
        p5.ellipse(210, 500, 480);
        
        // Botón central amarillo (donut)
        p5.fill(255, 230, 16);
        p5.ellipse(210, 500, 380);
        // Relleno interior del botón central amarillo 
        p5.fill(0); 
        p5.ellipse(210, 500, 300);
        
        // Botón rojo (circular)
        p5.fill(202, 18, 18);
        p5.ellipse(415, 220, 150);
        
        // Botón magenta (circular)
        p5.fill(255, 0, 255);
        p5.ellipse(165, 770, 100);

        // Botón bop It (circular)
        p5.fill(89, 20, 179);
        p5.ellipse(210, 500, 240);

        p5.image(this.bopItImg, 90,420, 250, 168.75)
        
        

        
    }

    hideInput(){
    }

    showInput(){
       
    }

}
