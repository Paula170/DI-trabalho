let planets = [];
let backgroundColor = 0; // Color de fondo predeterminado

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(backgroundColor);
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
    planet.display();
  });
}

function mousePressed() {
  planets.forEach(planet => {
    planet.dragging = planet.contains(mouseX, mouseY);
    if (planet.dragging) {
      planet.offsetY = mouseY - planet.y;
    }
  });

  // Verifica si el clic fue en el sol (primer planeta)
  if (planets[0].contains(mouseX, mouseY)) {
    // Cambia el color de fondo al azar
    backgroundColor = color(random(255), random(255), random(255));
  }
}

function mouseReleased() {
  planets.forEach(planet => {
    planet.dragging = false;
  });
}

class Planet {
  constructor(x, y, size, planetColor) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.planetColor = planetColor;
    this.dragging = false;
    this.offsetY = 0;
  }

  contains(px, py) {
    const d = dist(px, py, this.x, this.y);
    return d < this.size / 2;
  }

  display() {
    fill(this.planetColor);
    ellipse(this.x, this.y, this.size, this.size);
    if (this.dragging) {
      this.y = mouseY - this.offsetY;
    }
  }
}
