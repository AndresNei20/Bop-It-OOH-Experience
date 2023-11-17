export class Score {
    constructor(p5) {
        this.p5 = p5;
        this.points = 2500; // La puntuación actual del jugador
        this.playerName = "Andres Pro"; // El nombre del jugador
        this.leaders = [ // Los líderes y sus puntuaciones
            { name: "Pepe Ganga", score: 3000 },
            { name: "Don Bop It", score: 2800 },
            { name: "Anne98", score: 2500 }
        ];

        this.yOffsetCircle = 50; // Ajuste vertical para el círculo
        this.yOffsetPoints = 50; // Ajuste vertical para los puntos
        this.yOffsetRest = 100; // Ajuste vertical para el resto de elementos
    }

    show() {
        this.p5.background(0); // Fondo negro

        const yOffsetCircle = this.yOffsetCircle; // Ajuste vertical para el círculo
        const yOffsetPoints = this.yOffsetPoints; // Ajuste vertical para los puntos
        const yOffsetRest = this.yOffsetRest; // Ajuste vertical para el resto de elementos

        // Dibuja el círculo y la puntuación
        this.p5.fill(128, 0, 128); // Color púrpura para el círculo
        this.p5.ellipse(this.p5.width / 2, 100 + yOffsetCircle, 200, 200);
        this.p5.fill(255); // Color del texto blanco
        this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
        this.p5.textSize(32);
        this.p5.text(`${this.points}\nPoints`, this.p5.width / 2, 100 + yOffsetPoints);

        // Resto del contenido
        this.p5.textSize(24);
        this.p5.text(`Crazy Score\n${this.playerName}!\nCongratulations!`, this.p5.width / 2, 250 + yOffsetRest);

        // Botón "Next"
        this.p5.fill(255, 255, 0); // Botón amarillo
        this.p5.rect(this.p5.width / 2 - 50, 300 + yOffsetRest, 100, 40); // Ajusta las dimensiones según sea necesario
        this.p5.fill(0); // Texto en color negro
        this.p5.textSize(18);
        this.p5.text('Next', this.p5.width / 2, 325 + yOffsetRest);

        // Tabla de líderes
        this.p5.textSize(22);
        this.p5.fill(255); // Texto en blanco
        this.p5.text('Leader Board', this.p5.width / 2, 375 + yOffsetRest);
        this.leaders.forEach((leader, index) => {
            let y = 400 + index * 50 + yOffsetRest;
            this.p5.fill(index === 0 ? 255 : 0, index === 0 ? 20 : 0, index === 0 ? 200 : 255); // Color azul para los líderes
            this.p5.rect(this.p5.width / 2.4 - 130, y, 335,30); // Ajusta las dimensiones del rectángulo según sea necesario
            this.p5.fill(255); // Números en blanco
            this.p5.textSize(16);
            this.p5.text(`${index + 1}. ${leader.name}`, this.p5.width / 2 - 120, y + 20);
            if (leader.score) {
                this.p5.textAlign(this.p5.RIGHT, this.p5.CENTER);
                this.p5.text(`${leader.score} points`, this.p5.width / 2 + 120, y + 20);
                this.p5.textAlign(this.p5.LEFT, this.p5.CENTER);
            }
        });
    }

    hideInput() {
        this.nextButton.hide();
    }

    showInput() {
        this.nextButton.show();
    }

    mousePressed() {}
}   