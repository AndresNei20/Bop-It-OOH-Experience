

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

        //Circulo para quitarle al botón azul y naranja
        p5.fill( 0);
        p5.ellipse(210, 500, 480);
        
        // Botón central amarillo (donut)
        p5.fill(255, 255, 0);
        p5.ellipse(210, 500, 380);
        // Relleno interior del botón central amarillo 
        p5.fill(0); 
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

    mousePressed() {
        const shapePressed = this.mouseIsOverShape();
    
        switch (shapePressed) {
            case 'red':
                // Código para cuando el botón rojo es presionado
                console.log('Red button pressed');
                break;
            case 'magenta':
                // Código para cuando el botón magenta es presionado
                console.log('Magenta button pressed');
                break;
            case 'yellow':
                // Código para cuando el botón amarillo es presionado
                console.log('Yellow button pressed');
                break;
            case 'bopIt':
                // Código para cuando el botón bopIt es presionado
                console.log('Bop It button pressed');
                break;
            case 'orange':
                // Código para cuando el botón naranja es presionado
                console.log('Orange button pressed');
                break;
            case 'blue':
                // Código para cuando el botón azul es presionado
                console.log('Blue button pressed');
                break;
            default:
                // Código para cuando ninguna forma es presionada
                console.log('No button pressed');
                break;
        }
    }
      
    }
