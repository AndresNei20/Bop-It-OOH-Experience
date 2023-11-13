export class Players {
    constructor(p5) {
        this.p5 = p5;
        this.background = this.p5.loadImage('../img/playersScreen.png');
        this.titleColor = 'yellow';
        this.textStrokeColor = 'yellow'; 
        this.titleSize = 40;
        this.textSize = 25;
        this.playerOneColor = 'blue';
        this.playerTwoColor = 'red';
        this.borderColorPlayerOne = 'blue'; // Color del borde del recuadro de Player 1
        this.borderColorPlayerTwo = 'red'; // Color del borde del recuadro de Player 2
        this.borderWidth = 3; // Grosor del borde del recuadro
        this.borderRadius = 10; // Radio de borde para hacerlo redondeado
        this.boxPadding = 10; // Espaciado alrededor del texto dentro del recuadro
        this.boxWidth = 350; // Ancho deseado de las cajas
        this.textColor = 'white'; // Color del texto dentro de las cajas
        this.textPlayerOne = "John Doe 1"; // Texto para Player 1
        this.textPlayerTwo = "John Doe 2"; // Texto para Player 2
    }

    show(p5) {
        p5.background('black');
        p5.image(this.background, 0, 0);

        p5.textSize(this.titleSize);
        p5.fill(this.titleColor);
        p5.stroke(this.textStrokeColor);
        p5.strokeWeight(2);

        const centerX = p5.width / 2;
        const centerY = p5.height / 5;

        p5.textAlign(p5.CENTER, p5.CENTER);
        const title = "PLAYERS";

        // Muestra el título centrado
        p5.text(title, centerX, centerY);

        p5.textSize(this.textSize);

        // Alinea los subtitulos a la izquierda
        const subtitleX = p5.width / 6;
        const subtitleY = p5.height / 3.5;

        p5.textAlign(p5.LEFT, p5.CENTER);

        const playerOne = "PLAYER 1";
        p5.noStroke();
        p5.fill(this.playerOneColor);
        p5.text(playerOne, subtitleX, subtitleY);

        const playerTwo = "PLAYER 2";
        p5.noStroke();
        p5.fill(this.playerTwoColor);

        // Ajusta la posición vertical de Player 2 para agregar interlineado
        const playerTwoY = subtitleY + 150; // Ajusta el valor según tus preferencias para el espacio entre los jugadores
        p5.text(playerTwo, subtitleX, playerTwoY);

        // Dibuja un recuadro con bordes redondeados debajo de Player 1
        const playerOneBoxX = subtitleX - this.boxPadding; // Ajusta la posición horizontal del recuadro
        const playerOneBoxY = subtitleY + this.textSize + this.boxPadding; // Coloca debajo de Player 1
        const playerOneBoxHeight = this.textSize + 2 * this.boxPadding; // Alto del recuadro basado en el tamaño del texto
        p5.noFill();
        p5.stroke(this.borderColorPlayerOne); // Usa el color del borde de Player 1
        p5.strokeWeight(this.borderWidth);
        p5.rect(playerOneBoxX, playerOneBoxY, this.boxWidth, playerOneBoxHeight, this.borderRadius); // Usa el radio de borde
        p5.fill(this.borderColorPlayerOne);
        p5.noStroke();
        p5.fill(this.textColor); // Configura el color del texto dentro de la caja
        

        // Dibuja un recuadro con bordes redondeados debajo de Player 2
        const playerTwoBoxX = subtitleX - this.boxPadding; // Ajusta la posición horizontal del recuadro
        const playerTwoBoxY = playerTwoY + this.textSize + this.boxPadding; // Coloca debajo de Player 2
        const playerTwoBoxHeight = this.textSize + 2 * this.boxPadding; // Alto del recuadro basado en el tamaño del texto
        p5.noFill();
        p5.stroke(this.borderColorPlayerTwo); // Usa el color del borde de Player 2
        p5.strokeWeight(this.borderWidth);
        p5.rect(playerTwoBoxX, playerTwoBoxY, this.boxWidth, playerTwoBoxHeight, this.borderRadius); // Usa el radio de borde
        p5.fill(this.borderColorPlayerTwo);
        p5.noStroke();
        p5.fill(this.textColor); // Configura el color del texto dentro de la caja


    }
}