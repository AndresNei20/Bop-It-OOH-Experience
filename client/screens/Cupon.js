export class Cupon {
    constructor(p5) {
      this.p5 = p5;
      this.cuponImage = this.p5.loadImage('img/hasbroImage.png');
      this.back = this.p5.loadImage('img/bolitas.png');
      this.backgroundColor = '#000000'; // Un fondo negro con partículas, asumiendo que tienes una función para dibujarlas
      this.textColor = '#FFFFFF'; // Texto blanco
      this.discountTagColor = '#FF0000'; // Etiqueta roja para el descuento
      this.cuponImageSrc = 'path_to_your_cupon_image.png';
      this.customFont = this.p5.loadFont('./fonts/RussoOne-Regular.ttf');
      this.sendBtn = this.p5.createButton('Send');
      this.sendBtn.position(160, 550);
      this.sendBtn.style('background-color', 'FFE610');
      this.sendBtn.style('color', '3E0A5D');
      this.sendBtn.style('padding', '10px 20px'); // Agrega un poco de padding para que sea más grande
      this.sendBtn.style('border', 'none'); // Elimina el borde
      this.sendBtn.style('border-radius', '5px'); 
      this.sendBtn.mousePressed(this.handlePlayPressed.bind(this));
      

      this.hideInput();
    }
  
       
    setPlayCallback(callback) {
      this.playCallback = callback;
    }
  
    handlePlayPressed() {
        if (this.playCallback) {
            this.playCallback();
        }
    }
  
    show() {

      // Configurar los elementos de la pantalla del cupón
      this.p5.background(this.backgroundColor); // Fondo
      this.p5.background(this.back,50)
      this.p5.fill(this.textColor); // Color del texto

       //Rectángulo blanco
       this.p5.fill(255);
       this.p5.rect(this.p5.width / 2 - 180, 80, 360, 560);
  
      // Dibujar imagen del cupón
      this.p5.image(this.cuponImage, this.p5.width / 2 - this.cuponImage.width / 2, 100);
        
      this.p5.textFont(this.customFont);
      // Dibujar texto del cupón
      this.p5.textSize(18);
      this.p5.fill(0); 
      this.p5.text('50% OFF', 160, 360); // Cambia los números para ajustar la posición
      this.p5.text('IN ANY HASBRO GAME', this.p5.width / 2 - 110, 410);

      this.p5.text('Buy your favorite game with a great',this.p5.width / 2 - 165, 440);
      this.p5.text('discount. Valid until this date',this.p5.width / 2 - 125, 470);
      this.p5.text('20/09/2023',this.p5.width / 2 - 50, 500);
  
      this.sendBtn.show();

      
    }
 


  hideInput(){
      this.sendBtn.hide();
  }

  showInput(){
      this.sendBtn.show();
  }

  mousePressed(){

  }
}