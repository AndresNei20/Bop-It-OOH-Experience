export class Cupon {
    constructor(p5) {
      this.p5 = p5;
      this.cuponImage = this.p5.loadImage('img/hasbroImage.png');
      this.back = this.p5.loadImage('img/bolitas.png');
      this.backgroundColor = '#000000'; // Un fondo negro con partículas, asumiendo que tienes una función para dibujarlas
      this.textColor = '#FFFFFF'; // Texto blanco
      this.discountTagColor = '#FF0000'; // Etiqueta roja para el descuento
      this.buttonColor = '#FFFF00'; // Botón amarillo
      this.cuponImageSrc = 'path_to_your_cupon_image.png'; // Asegúrate de proporcionar la ruta correcta a la imagen del cupón
      this.customFont = this.p5.loadFont('./fonts/RussoOne-Regular.ttf');
    }
  
    preload() {
      // Cargar la imagen del cupón
    }
  
    show() {
      // Configurar los elementos de la pantalla del cupón
      this.p5.background(this.backgroundColor); // Fondo
      this.p5.background(this.back,50)
      this.p5.fill(this.textColor); // Color del texto
  
      // Dibujar imagen del cupón
      this.p5.image(this.cuponImage, this.p5.width / 2 - this.cuponImage.width / 2, 100);
        
      p5.textFont(this.customFont);
      // Dibujar texto del cupón
      this.p5.textSize(20);
      this.p5.text('50% OFF', 160, 360); // Cambia los números para ajustar la posición
      this.p5.text('IN ANY HASBRO GAME', 100, 410);

      this.p5.text('Buy your favorite game with a great', 55, 440);
      this.p5.text('discount. Valid until this date', 85, 470);
      this.p5.text('20/09/2023', 160, 500);
  
       // Dibujar botón de envío
       this.p5.fill(this.buttonColor);
       const buttonWidth = 100;
       const buttonHeight = 40;
       const buttonX = this.p5.width / 2 - buttonWidth / 2;
       const buttonY = 550; // Mover el botón hacia abajo cambiando la coordenada Y
       
       this.p5.rect(buttonX, buttonY, buttonWidth, buttonHeight); // Rectángulo del botón
     
       // Centrar el texto dentro del botón
       this.p5.fill('#000000'); // Cambiar el color del texto a negro
       this.p5.textSize(18);
       this.p5.textStyle(this.p5.BOLD); // Establecer el texto en negrita
     
       // Obtener la posición central horizontal del texto
       const text = 'SEND';
       const textWidth = this.p5.textWidth(text); // Obtener el ancho del texto
       const textX = this.p5.width / 2 - textWidth / 2; // Centrar el texto horizontalmente
     
       // Centrar el texto verticalmente
       const textY = buttonY + buttonHeight / 2 + 6; // Agregar un pequeño ajuste para centrar verticalmente
       
       this.p5.text(text, textX, textY); // Texto centrado en el botón// Texto centrado en el botón
    }
    
    hideInput(){

    }
  
    showInput(){
  
    }
  
    mousePressed(){
  
    }
}