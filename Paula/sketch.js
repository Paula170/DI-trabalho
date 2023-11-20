let planets = [];
let backgroundColor = 0;
let isBlue = true;

let closeButtonSize = 20;
let closeButtonX, closeButtonY;
let rockyCloseButtonX, rockyCloseButtonY;
let gasPlanetsCloseButtonX, gasPlanetsCloseButtonY;
let settingsButtonSize = 30;
let settingsButtonX, settingsButtonY;
let menuVisible = false;
let menuContent = "";
let menuType = "";

let menuX;
let menuY;
let menuWidth = 400;
let menuHeight = 200;

let bpmSlider, rockVolumeSlider, gasVolumeSlider;
let rockyBpmSlider, rockyRockVolumeSlider, rockyGasVolumeSlider;
let gasPlanetsBpmSlider, gasPlanetsRockVolumeSlider, gasPlanetsGasVolumeSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  const centerX = width / 2;
  const centerY = height / 2;

  menuX = (width - menuWidth) / 2;
  menuY = (height - menuHeight) / 2;

  planets = [
    new Planet(centerX, centerY, 150, color(255, 204, 0)),
    new Planet(centerX + 100, centerY + 200, 20, color(0, 0, 255), "rocky"),
    new Planet(centerX - 180, centerY + 50, 35, color(255, 0, 0), "rocky"),
    new Planet(centerX + 260, centerY + 30, 30, color(200, 200, 200), "rocky"),
    new Planet(centerX + 340, centerY - 300, 40, color(0, 255, 0), "rocky"),
    new Planet(centerX - 420, centerY + 200, 35, color(255, 255, 0), "gasPlanets"),
    new Planet(centerX + 500, centerY + 300, 40, color(255, 0, 255), "gasPlanets"),
    new Planet(centerX - 580, centerY - 400, 20, color(255, 255, 0), "gasPlanets"),
    new Planet(centerX + 660, centerY, 20, color(0, 255, 255), "gasPlanets"),
  ];

  closeButtonX =1000 ;
  closeButtonY =380;

  rockyCloseButtonX = 385;  
  rockyCloseButtonY = 30;   

  gasPlanetsCloseButtonX = 1625;
  gasPlanetsCloseButtonY = 30;

  settingsButtonX = settingsButtonY = settingsButtonSize;

  bpmSlider = createSlider(60, 180, 120);
  rockVolumeSlider = createSlider(0, 1, 0.5, 0.01);
  gasVolumeSlider = createSlider(0, 1, 0.5, 0.01);

  rockyBpmSlider = createSlider(60, 180, 120);
  rockyRockVolumeSlider = createSlider(0, 1, 0.5, 0.01);
  rockyGasVolumeSlider = createSlider(0, 1, 0.5, 0.01);

  gasPlanetsBpmSlider = createSlider(60, 180, 120);
  gasPlanetsRockVolumeSlider = createSlider(0, 1, 0.5, 0.01);
  gasPlanetsGasVolumeSlider = createSlider(0, 1, 0.5, 0.01);

  bpmSlider.position(menuX + 150, menuY + 45);
  rockVolumeSlider.position(menuX + 150, menuY + 85);
  gasVolumeSlider.position(menuX + 150, menuY + 125);

  rockyBpmSlider.position(menuX + 250, menuY + 45);
  rockyRockVolumeSlider.position(menuX + 250, menuY + 85);
  rockyGasVolumeSlider.position(menuX + 250, menuY + 125);

  gasPlanetsBpmSlider.position(menuX + 150, menuY + 80);
  gasPlanetsRockVolumeSlider.position(menuX + 150, menuY + 85);
  gasPlanetsGasVolumeSlider.position(menuX + 150, menuY + 125);

  bpmSlider.hide();
  rockVolumeSlider.hide();
  gasVolumeSlider.hide();

  rockyBpmSlider.hide();
  rockyRockVolumeSlider.hide();
  rockyGasVolumeSlider.hide();

  gasPlanetsBpmSlider.hide();
  gasPlanetsRockVolumeSlider.hide();
  gasPlanetsGasVolumeSlider.hide();
}

function draw() {
  background(backgroundColor);
  planets.forEach(planet => {
    planet.update();
    planet.display();
  });

  fill(255);
  rect(settingsButtonX, settingsButtonY, settingsButtonSize, settingsButtonSize);
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('⚙️', settingsButtonX + settingsButtonSize / 2, settingsButtonY + settingsButtonSize / 2);

  if (menuVisible) {
    fill(255);
    rect(menuX, menuY, menuWidth, menuHeight);

    fill(0);
    textSize(16);
    textAlign(LEFT, TOP);
    text(menuContent, menuX + 50, menuY + 45);

    if (menuType === "settings") {
      fill(255, 0, 0);
      rect(closeButtonX, closeButtonY, closeButtonSize, closeButtonSize);
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text('X', closeButtonX + closeButtonSize / 2, closeButtonY + closeButtonSize / 2);

      bpmSlider.position(menuX + 150, menuY + 45);
      rockVolumeSlider.position(menuX + 150, menuY + 85);
      gasVolumeSlider.position(menuX + 150, menuY + 125);

      bpmSlider.show();
      rockVolumeSlider.show();
      gasVolumeSlider.show();
    } else if (menuType === "rocky") {
      fill(255, 0, 0);
      rect(rockyCloseButtonX, rockyCloseButtonY, closeButtonSize, closeButtonSize);
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text('X', rockyCloseButtonX + closeButtonSize / 2, rockyCloseButtonY + closeButtonSize / 2);

      rockyBpmSlider.position(menuX + 250, menuY + 45);
      rockyRockVolumeSlider.position(menuX + 250, menuY + 85);
      rockyGasVolumeSlider.position(menuX + 250, menuY + 125);

      rockyBpmSlider.show();
      rockyRockVolumeSlider.show();
      rockyGasVolumeSlider.show();
    } else if (menuType === "gasPlanets") {
      fill(255, 0, 0);
      rect(gasPlanetsCloseButtonX, gasPlanetsCloseButtonY, closeButtonSize, closeButtonSize);
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text('X', gasPlanetsCloseButtonX + closeButtonSize / 2, gasPlanetsCloseButtonY + closeButtonSize / 2);

      gasPlanetsBpmSlider.position(menuX + 250, menuY + 45);
      gasPlanetsRockVolumeSlider.position(menuX + 250, menuY + 85);
      gasPlanetsGasVolumeSlider.position(menuX + 250, menuY + 125);

      gasPlanetsBpmSlider.show();
      gasPlanetsRockVolumeSlider.show();
      gasPlanetsGasVolumeSlider.show();
    }
  } else {
    bpmSlider.hide();
    rockVolumeSlider.hide();
    gasVolumeSlider.hide();
    rockyBpmSlider.hide();
    rockyRockVolumeSlider.hide();
    rockyGasVolumeSlider.hide();
    gasPlanetsBpmSlider.hide();
    gasPlanetsRockVolumeSlider.hide();
    gasPlanetsGasVolumeSlider.hide();
  }
}

function mousePressed() {
  planets.forEach(planet => {
    planet.startDragging();
  });

  if (planets[0].contains(mouseX, mouseY)) {
    if (isBlue) {
      backgroundColor = color(40, 89, 137);
    } else {
      backgroundColor = color(47, 43, 69);
    }
    isBlue = !isBlue;
  }

  if (mouseX > settingsButtonX && mouseX < settingsButtonX + settingsButtonSize &&
    mouseY > settingsButtonY && mouseY < settingsButtonY + settingsButtonSize) {
    menuVisible = !menuVisible;
    menuContent = "BPM\nRock Volume\nGas Volume";
    menuType = "settings";
    menuY = (height - menuHeight) / 2; 
  }

  if (menuVisible && menuType === "settings" &&
    mouseX > closeButtonX && mouseX < closeButtonX + closeButtonSize &&
    mouseY > closeButtonY && mouseY < closeButtonY + closeButtonSize) {
    menuVisible = false;
  }

  if (menuVisible && menuType === "rocky" &&
    mouseX > rockyCloseButtonX && mouseX < rockyCloseButtonX + closeButtonSize &&
    mouseY > rockyCloseButtonY && mouseY < rockyCloseButtonY + closeButtonSize) {
    menuVisible = false;
  }

  if (menuVisible && menuType === "gasPlanets" &&
    mouseX > gasPlanetsCloseButtonX && mouseX < gasPlanetsCloseButtonX + closeButtonSize &&
    mouseY > gasPlanetsCloseButtonY && mouseY < gasPlanetsCloseButtonY + closeButtonSize) {
    menuVisible = false;
  }
}

function doubleClicked() {
  planets.slice(1, 7).forEach(planet => {
    if (planet.contains(mouseX, mouseY)) {
      menuVisible = true;
      menuContent = planet.content;
      menuType = planet.content;

     
      if (planet.content === "rocky") {
        menuY = 20;
        menuX = 10;
      } else if (planet.content === "gasPlanets") {
        menuY = 20;
        menuX = 1250;
      }
    }
  });
}

function mouseReleased() {
  planets.forEach(planet => {
    planet.stopDragging();
  });
}

class Planet {
  constructor(x, y, size, planetColor, content = "") {
    this.x = x;
    this.y = y;
    this.size = size;
    this.planetColor = planetColor;
    this.dragging = false;
    this.angle = 0;
    this.radius = dist(this.x, this.y, width / 2, height / 2);
    this.content = content;
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
 
