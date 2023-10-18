

export class Main {
    constructor(p5) {
        this.p5 = p5;
        this.p5.noStroke();
        this.bopItImg = this.p5.loadImage('img/logo.png')
        
    }

    show(p5) {
        p5.background('black');

         // Botón naranja (Rectángulo) 
        p5.fill(255, 165, 0);
        p5.rect(265, 630, 150, 175);
        
        //Botón azul (Rectángulo)
        p5.fill(0, 0, 255);
        p5.rect(0, 200, 290, 250);

        //resta botón azul y naranja
        p5.fill( 0);
        p5.ellipse(210, 500, 480);
        
        // Botón central (donut)
        p5.fill(255, 255, 0);
        p5.ellipse(210, 500, 380);
        p5.fill(0); // relleno interior
        p5.ellipse(210, 500, 300);
        
        // Botón rojo (circular)
        p5.fill(400, 0, 0);
        p5.ellipse(415, 220, 150);
        
        // Botón magenta (circular)
        p5.fill(255, 0, 255);
        p5.ellipse(165, 770, 100);

        // Botón bop It (circular)
        p5.fill(89, 20, 179);
        p5.ellipse(210, 500, 250);

        p5.image(this.bopItImg, 90,420, 250, 168.75)
        
        

        
    }

    hideInput(){
      
      }

      showInput(){
       
      }
      
    }
