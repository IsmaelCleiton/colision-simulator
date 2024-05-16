import { CAR_WIDTH, CAR_HEIGHT } from '../constants/car-dimensions.js';
import { getClientHeight, getClientWidth } from '../functions/window-size.js';

export default class Car {
    constructor({ x, y, diameter, speed, weight, image }) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.speed = speed;
        this.weight = weight;
        this.image = image;
    }

    update() {
        this.move();

        // Verifica se a bolinha atinge as bordas da tela e inverte a direção
        if (
            this.x <= this.diameter / 2
            || this.x >= (getClientWidth() - CAR_WIDTH) - (this.diameter / 2)
        ) {
            this.speed *= -1;
        }
    }

    updateSize() {
        this.x = (this.x / getClientWidth()) * getClientWidth();
    }

    display() {
        image(this.image, this.x, this.y, CAR_WIDTH, CAR_HEIGHT);
    }

    move() {
        this.x += this.speed;
    }

    displayInfo() {
        fill(0);
        textAlign(CENTER, BOTTOM);

        // Exibe a velocidade e a massa do carrinho
        text(`Velocidade: ${this.speed.toFixed(2)}`, this.x + (0.2 * CAR_WIDTH), this.y - this.diameter - 20);
        text(`Massa: ${this.weight}`, this.x + (0.2 * CAR_WIDTH), this.y - this.diameter - 35);

        // Calcular a energia cinética
        const kineticEnergy = 0.5 * this.weight * (this.speed ** 2);
        text(`Energia Cinética: ${kineticEnergy.toFixed(2)}`, this.x + (0.2 * CAR_WIDTH), this.y - this.diameter - 50);

        // Calcular e exibe o momento do carrinho
        const momentum = this.weight * this.speed;
        text(`Momento: ${momentum.toFixed(2)}`, this.x + (0.2 * CAR_WIDTH), this.y - this.diameter - 65);

        text(`x:${this.x}; y:${this.y}`, this.x + (0.2 * CAR_WIDTH), this.y - this.diameter - 80);
    }
}
