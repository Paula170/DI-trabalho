let startButton, exitButton;
let backgroundImage;
let planets = [];

function preload() {
    backgroundImage = loadImage('images/solar_system_background.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    background(backgroundImage);

    for (let i = 0; i < 5; i++) {
        planets.push(new Planet(random(width), random(height), random(20, 50), random(0.1, 0.5)));
    }

    startButton = createButton('Start');
    startButton.mousePressed(startGame);

    exitButton = createButton('Exit');
    exitButton.mousePressed(exitGame);

    let menuContainer = createDiv().class('menu-container');
    menuContainer.child(createDiv().class('title').html('Solar System Sound Program'));
    menuContainer.child(startButton);
    menuContainer.child(exitButton);
    menuContainer.position(width / 2, height / 2);
}

function draw() {
    image(backgroundImage, 0, 0, width, height);

    for (let planet of planets) {
        planet.move();
        planet.display();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function startGame() {
    alert('Started!');
}

function exitGame() {
    alert('Exited!');
}

class Planet {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
    }

    move() {
        this.x += this.speed;
        if (this.x > width + this.size) {
            this.x = -this.size;
        }
    }

    display() {
        fill(255, 150);
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
    }
}
