let acc = 0;
let totalAcc = 0;
export class Shake {
  constructor(p5, socket, playerData) {
      this.p5 = p5;
      this.playerData = playerData
      this.shakeImg = p5.loadImage('img/shakeIcons.png');
  }

  

  show(p5) {
      // Mostrar la imagen en su posición original
      this.p5.image(this.shakeImg, 25, 150);

  }

  hideInput() {

  }

  showInput() {

  }

  mousePressed() {}
  // Eliminar handleShake si no se está usando
}