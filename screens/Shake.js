export class Shake {
    constructor(p5) {
      this.p5 = p5;
      this.shakeImg = p5.loadImage('img/shakeIcons.png');
      this.shakeDuration = 20000; // Duración de la vibración en milisegundos
      this.shakeStart = 0; // Variable para almacenar el tiempo de inicio de la vibración
      this.shakeActive = false; // Variable para rastrear si la vibración está activa
    }
  
    startShake() {
      this.shakeStart = this.p5.millis(); // Iniciar el temporizador de vibración
      this.shakeActive = true;
    }
  
    stopShake() {
      this.shakeActive = false;
    }
  
    show(p5) {
      // Verificar si la vibración está en curso
      if (this.shakeActive) {
        // Calcular una posición de sacudida aleatoria
        let x = this.p5.random(-5, 5);
        let y = this.p5.random(-5, 5);
  
        // Dibujar la imagen con la sacudida
        this.p5.image(this.shakeImg, 25 + x, 150 + y);
      } else {
        // La vibración ha terminado, muestra la imagen en su posición original
        this.p5.image(this.shakeImg, 25, 150);
      }
    }
  
    handleShake(event) {
      if (event.beta > 30) {
        // Si la inclinación supera cierto umbral (30 grados en este ejemplo), otorga puntos
        // Aumenta la puntuación en 100 puntos (ajusta el valor según tus necesidades)
        currentScore += 100;
      }
    }
  
    hideInput() {
      // Implementa la lógica para ocultar la entrada de datos si es necesario
    }
  
    showInput() {
      // Implementa la lógica para mostrar la entrada de datos si es necesario
    }
  }