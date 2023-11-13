let planets = [];

var options = {
  hostname:"localhost",
  port:5500,
  auto_connect: false,
  supported_objects: ["live.grid"]
}

var xebra = new Xebra.State(options);



let menuVisible = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  const centerX = width / 2;
  const centerY = height / 2;

  planets = [
    new Planet(centerX, centerY, 150, color(255, 204, 0)),
    new Planet(centerX + 100, centerY + 200, 20, color(200)),
    new Planet(centerX - 180, centerY + 50, 35, color(161, 112, 0)),
    new Planet(centerX + 260, centerY + 30, 30, color(28, 36, 189)),
    new Planet(centerX + 340, centerY - 300, 40, color(189, 55, 28)),
    new Planet(centerX - 420, centerY + 200, 35, color(130, 73, 61)),
    new Planet(centerX + 500, centerY + 300, 40, color(224, 176, 18)),
    new Planet(centerX - 580, centerY - 400, 20, color(15, 209, 203)),
    new Planet(centerX + 660, centerY, 20, color(8, 82, 161)),
  ];
}

function draw() {
  background(84, 88, 209);
  planets.forEach(planet => {
    planet.display();
  });
    // Check for mouse position to show the menu
    if (mouseIsPressed && mouseX < 50 && mouseY < 50) {
      menuVisible = !menuVisible;
      if (menuVisible) {
        showMenu();
      } else {
        hideMenu();
      }
    }
  }


function mousePressed() {
  planets.forEach(planet => {
    planet.dragging = planet.contains(mouseX, mouseY);
    if (planet.dragging) {
      planet.offsetY = mouseY - planet.y;
    }
  });
}

function mouseReleased() {
  planets.forEach(planet => {
    planet.dragging = false;
  });
}

function showMenu() {
  document.getElementById('menu').classList.remove('hidden');
}

function hideMenu() {
  document.getElementById('menu').classList.add('hidden');
}

function changeColor(color) {
  // Add functionality to change color based on the menu selection
  // For now, just print the selected color to the console
  console.log(`Selected color: ${color}`);
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

xebra.on ("object_added", updateWithObject);
xebra.on ("object_changed", updateWithObject);

xebraState.on("connection_changed", function (status) {
  console.log("Connection status:", status);
});
