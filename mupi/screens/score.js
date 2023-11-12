export class Score {
    constructor(p5) {
        this.p5 = p5;
        this.background = this.p5.loadImage('../img/back_instructions.png');
        this.purpleLine = this.p5.loadImage('../img/purpleLine.png');
        this.titleSize = 60;
        this.textSize = 20; // Tamaño de texto para Player 1 y puntuación
        this.titleTextSize = 50; // Tamaño de texto para el título "SCORE"
        this.textColor = 'white';
        this.johnDoeColor = 'orange'; // Color personalizado para JohnDoe
        this.playerTwoNameColor = 'lightblue'; // Color personalizado para el nombre de Player 2
    }

    show(p5, player1, player2) {
        p5.background('black');
        p5.image(this.background, 0, 0);

        // Configura el título "SCORE" con un trazo blanco
        p5.textSize(this.titleTextSize);
        p5.fill(this.textColor);
        p5.stroke('white'); // Color del trazo
        p5.strokeWeight(3); // Grosor del trazo

        const centerX = p5.width / 2;
        const centerY = p5.height / 2.8;
        const titleY = 250; // Ajusta la posición vertical del título

        p5.textAlign(p5.CENTER, p5.CENTER + 30);
        const titleText = "SCORE";

        // Mostrar el título "SCORE" centrado y arriba
        p5.text(titleText, centerX, centerY);

        // Configuración de la primera línea de información
        const firstLineY = titleY + 120; // Espacio entre el título y la primera línea de información

        // Texto de Player 1 (alineado a la izquierda)
        p5.textSize(this.textSize);
        p5.textAlign(p5.RIGHT, p5.RIGHT);
        p5.noStroke(); // Elimina el trazo para el texto de "Player 1"
        p5.text("Player 1", centerX - 140, firstLineY);

        // Nombre del jugador 1 (centrado) con color personalizado
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.fill(this.johnDoeColor); // Aplica el color personalizado a JohnDoe
        p5.text(player1.name, centerX, firstLineY);

        // Puntuación de jugador 1 (alineada a la derecha)
        p5.textAlign(p5.LEFT, p5.LEFT);
        p5.noStroke(); // Elimina el trazo para la puntuación
        p5.fill(this.textColor); // Restablece el color predeterminado para la puntuación
        p5.text(player1.score + " pts", centerX + 140, firstLineY);

        // Mostrar la primera imagen purpleLine debajo de la primera línea de información
        const firstLineImageY = firstLineY + 40; // Espacio entre la primera línea de información y la primera imagen
        p5.image(this.purpleLine, 100, firstLineImageY);

        // Configuración de la segunda línea de información
        const secondLineY = firstLineImageY + 40; // Espacio entre la primera imagen y la segunda línea de información

        // Texto de Player 2 (alineado a la izquierda)
        p5.textSize(this.textSize);
        p5.textAlign(p5.RIGHT, p5.RIGHT);
        p5.noStroke(); // Elimina el trazo para el texto de "Player 2"
        p5.text("Player 2", centerX - 140, secondLineY);

        // Nombre del jugador 2 (centrado) con color personalizado
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.fill(this.playerTwoNameColor); // Aplica el color personalizado al nombre de Player 2
        p5.text(player2.name, centerX, secondLineY);

        // Puntuación de jugador 2 (alineada a la derecha)
        p5.textAlign(p5.LEFT, p5.LEFT);
        p5.noStroke(); // Elimina el trazo para la puntuación de "Player 2"
        p5.fill(this.textColor); // Restablece el color predeterminado para la puntuación
        p5.text(player2.score + " pts", centerX + 140, secondLineY);

        // Mostrar la segunda imagen purpleLine debajo de la segunda línea de información
        const secondLineImageY = secondLineY + 40; // Espacio entre la segunda línea de información y la segunda imagen
        p5.image(this.purpleLine, 100, secondLineImageY);
    }
}
