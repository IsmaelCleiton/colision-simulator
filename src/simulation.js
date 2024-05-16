import { CAR_WIDTH } from './constants/car-dimensions.js';
import { ELASTIC, INELASTIC } from './constants/colision-types.js';
import { getClientHeight, getClientWidth } from './functions/window-size.js';
import Car from './entities/car.js';
import Colision from './entities/colision.js';

let backgroundImage;
let sounds = {};
let carsProperties = [];
let cars = [];
let colision;
let simulationRunning = false;
let colisionType = ELASTIC;



window.preload = () => {

    backgroundImage = loadImage('./assets/images/background.png');

    sounds = {
        engine: window.loadSound('./assets/sounds/engine_sound.mp3'),
        crash: window.loadSound('./assets/sounds/qubodup-crash.ogg'),
        startEngine: window.loadSound('./assets/sounds/engine_start_up_01.wav'),
        traffic: window.loadSound('./assets/sounds/gatve-varniu.ogg'),
    };

    carsProperties = [
        {
            x: 0.1 * getClientWidth(),
            y: 0.8 * getClientHeight(),
            diameter: 0,
            speed: 5,
            weight: 100,
            image: loadImage('./assets/images/car-a.png'),
        },
        {
            x: 0.7 * getClientWidth(),
            y: 0.8 * getClientHeight(),
            diameter: 0,
            speed: 0,
            weight: 140,
            image: loadImage('./assets/images/car-b.png'),
        },
    ];
}

window.setup = () => {
    canvas = createCanvas(getClientWidth, getClientHeight);

    cars = carsProperties.map((car) => new Car(car));
    colision = new Colision(cars);
}

window.draw = () => {
    background(backgroundImage);


    cars.forEach((car) => car.display());

    if (simulationRunning) {
        cars.forEach((car) => car.update());

        if (colision.hadCollision()) {
            if (getAudioContext().state !== 'running') {
                getAudioContext().resume();
                sounds.crash.play();
            }
            colision.resolve(colisionType);
        }
    }
    cars.forEach((car) => car.displayInfo());
}

window.windowResized = () => {
    resizeCanvas(getClientWidth(), getClientHeight());
    cars.forEach((car) => car.updateSize());

}

document.querySelector('.btn-pause').addEventListener('click', () => {
    if (getAudioContext().state === 'running') {
        getAudioContext().suspend();
        sounds.startEngine.stop();
        sounds.traffic.stop();
    }
    simulationRunning = false;
});

document.querySelector('.btn-start').addEventListener('click', () => {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
        sounds.startEngine.play();
        sounds.traffic.loop();
    } 


    setTimeout(() => {
        simulationRunning = true;
    }, 500);
});
