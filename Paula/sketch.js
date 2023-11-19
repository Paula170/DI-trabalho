let planets = [];
let backgroundColor = 0;
let isBlue = true;

let closeButtonSize = 20;
let closeButtonX, closeButtonY;
let bpmSlider, rockVolumeSlider, gasVolumeSlider;
let menuVisible = false;


let settingsIconX = 20;
let settingsIconY = 20;
let settingsIconSize = 30;


let menuX;
let menuY;
let menuWidth = 400;
let menuHeight = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  const centerX = width / 2;
  const centerY = height / 2;

  menuX = (width - menuWidth) / 2;
  menuY = (height - menuHeight) / 2;

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


  bpmSlider = createSlider(60, 180, 120); 
  rockVolumeSlider = createSlider(0, 1, 0.5, 0.01); 
  gasVolumeSlider = createSlider(0, 1, 0.5, 0.01);

  
  bpmSlider.position(menuX + 150, menuY + 45);
  rockVolumeSlider.position(menuX + 150, menuY + 85);
  gasVolumeSlider.position(menuX + 150, menuY + 125);

  
  bpmSlider.hide();
  rockVolumeSlider.hide();
  gasVolumeSlider.hide();
}

function draw() {
  background(backgroundColor);
  planets.forEach(planet => {
    planet.update();
    planet.display();
  });

  
  fill(255);
  rect(settingsIconX, settingsIconY, settingsIconSize, settingsIconSize);
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('⚙️', settingsIconX + settingsIconSize / 2, settingsIconY + settingsIconSize / 2);


  if (menuVisible) {
    fill(255);
    rect(menuX, menuY, menuWidth, menuHeight);

    fill(0);
    textSize(16);
    textAlign(LEFT, TOP);
    text('BPM', menuX + 50, menuY + 45);
    text('Rock Volume', menuX + 50, menuY + 85);
    text('Gas Volume', menuX + 50, menuY + 125);

    closeButtonX = menuX + menuWidth - closeButtonSize - 10;
    closeButtonY = menuY + 10;

 
    fill(255, 0, 0);
    rect(closeButtonX, closeButtonY, closeButtonSize, closeButtonSize);
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text('X', closeButtonX + closeButtonSize / 2, closeButtonY + closeButtonSize / 2);



  
  
    bpmSlider.show();
    rockVolumeSlider.show();
    gasVolumeSlider.show();

    
  } else {
   
    bpmSlider.hide();
    rockVolumeSlider.hide();
    gasVolumeSlider.hide();
  }
}

function mousePressed() {
  planets.forEach(planet => {
    planet.startDragging();
  });

  if (mouseX > settingsIconX && mouseX < settingsIconX + settingsIconSize &&
    mouseY > settingsIconY && mouseY < settingsIconY + settingsIconSize) {
  menuVisible = !menuVisible;
}

if (menuVisible && mouseX > closeButtonX && mouseX < closeButtonX + closeButtonSize &&
    mouseY > closeButtonY && mouseY < closeButtonY + closeButtonSize) {
  menuVisible = false;
}

 
  if (planets[0].contains(mouseX, mouseY)) {
    if (isBlue) {
      backgroundColor = color(40, 89, 137);
    } else {
      backgroundColor = color(47, 43, 69);
    }
    isBlue = !isBlue;
  }
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
    this.radius = dist(this.x, this.y, width / 2, height / 2);
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
