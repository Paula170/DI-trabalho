let planets = [];
let menuVisible = false;

var options = {
  hostname: "localhost",
  port: 8086,
  auto_connect: false,
}

var xebra = new Xebra.State(options);
xebra.on("object_added", updateWithObject);
xebra.on("object_changed", updateWithObject);
xebra.connect();

function sendToMax(val) {
 xebra.sendMessageToChannel("fromBrowser", val);
 console.log("enviou");
}

function updateWithObject(object1, object2) {
  if (object1.getParamValue("varname") === "earth"); {
    earth = object1.getParamValue("value");
    if (earth != null) {
      //console.log(earth);
      if (earth == 1) planets[1].planetStroke = 1;
      else planets[1].planetStroke = 0;
    }
  }
  
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  const centerX = width / 2;
  const centerY = height / 2;

  planets = [
    //SUN
    new Planet(centerX, centerY, 150, color(255, 204, 0), 0),
    //MARS(for now earth)
    new Planet(centerX + windowWidth/6, centerY + 200, 20, color(200, 0, 0), 0),
    //
    new Planet(centerX - windowWidth/5 + 50, 35, color(161, 112, 0), 0),
    //SUN
    new Planet(centerX + 260, centerY + 30, 30, color(28, 36, 189), 0),
    //SUN
    new Planet(centerX - windowWidth/7, centerY - 300, 40, color(189, 55, 28), 0),
    //SUN
    new Planet(centerX - windowWidth/6, centerY + 200, 35, color(130, 73, 61), 0),
    //SUN
    new Planet(centerX + 500, centerY + 300, 40, color(224, 176, 18), 0),
    //SUN
    new Planet(centerX - 580, centerY - 400, 20, color(15, 209, 203), 0),
    //SUN
    new Planet(centerX + 660, centerY, 20, color(8, 82, 161), 0),
  ];
}

function draw() {
  background(84, 88, 209);
  planets.forEach(planet => {
    planet.display();
  });

  if (mouseIsPressed) {
    sendToMax("ola");
    mouseIsPressed = false;
  }
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
  constructor(x, y, size, planetColor, planetStroke) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.planetColor = planetColor;
    this.dragging = false;
    this.offsetY = 0;
    this.planeStroke = planetStroke;
  }

  contains(px, py) {
    const d = dist(px, py, this.x, this.y);
    return d < this.size / 2;
  }

  display() {
    stroke(0);
    strokeWeight(this.planetStroke);
    fill(this.planetColor);
    ellipse(this.x, this.y, this.size, this.size);
    if (this.dragging) {
      this.y = mouseY - this.offsetY;
    }
  }
}

function keyPressed() {
  // Reset alpha value and last toggle time on any key press
  alphaValue = 50;
  lastToggleTime = millis();
}

