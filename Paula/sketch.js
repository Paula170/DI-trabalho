let planets = [];
let backgroundColor = 0;
let isBlue = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  const centerX = width / 2;
  const centerY = height / 2;

  planets = [
    new Planet(centerX, centerY, 150, color(255, 204, 0)),
    new Planet(centerX + 100, centerY + 200, 20, color(0, 0, 255)),
    new Planet(centerX - 180, centerY + 50, 35, color(255, 0, 0)),
    new Planet(centerX + 260, centerY + 30, 30, color(200, 200, 200)),
    new Planet(centerX + 340, centerY - 300, 40, color(0, 255, 0)),
    new Planet(centerX - 420, centerY + 200, 35, color(255, 255, 0)),
    new Planet(centerX + 500, centerY + 300, 40, color(255, 0, 255)),
    new Planet(centerX - 580, centerY - 400, 20, color(255, 255, 0)),
    new Planet(centerX + 660, centerY, 20, color(0, 255, 255)),
  ];
}

function draw() {
  background(backgroundColor);
  planets.forEach(planet => {
    planet.update();
    planet.display();
  });
}

function mousePressed() {
  planets.forEach(planet => {
    planet.startDragging();
  });
}

function mouseReleased() {
  planets.forEach(planet => {
    planet.stopDragging();
  });
}

class Planet {
  constructor(x, y, size, planetColor) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.planetColor = planetColor;
    this.dragging = false;
    this.angle = 0;
    this.radius = dist(this.x, this.y, width / 2, height / 2); // Distancia al centro para movimiento circular
  }

  startDragging() {
    if (this.contains(mouseX, mouseY)) {
      this.dragging = true;
    }
  }

  stopDragging() {
    this.dragging = false;
  }

  update() {
    if (this.dragging) {
      // Si está siendo arrastrado, actualiza la posición de manera circular
      this.angle = atan2(mouseY - height / 2, mouseX - width / 2);
      this.x = width / 2 + this.radius * cos(this.angle);
      this.y = height / 2 + this.radius * sin(this.angle);
    }
  }

  contains(px, py) {
    const d = dist(px, py, this.x, this.y);
    return d < this.size / 2;
  }

  display() {
    fill(this.planetColor);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
