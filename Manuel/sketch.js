let planets = [];
let backgroundColor = 0; 
let isBlue = true; 

let stars = [];
var speed;

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
let menuWidth = 600;
let menuHeight = 200;

let bpmSlider, rockVolumeSlider, gasVolumeSlider;
let rockyBpmSlider, rockyRockVolumeSlider, rockyGasVolumeSlider;
let gasPlanetsBpmSlider, gasPlanetsRockVolumeSlider, gasPlanetsGasVolumeSlider;


var options = {
  hostname: "localhost",
  port: 8086,
  auto_connect: false,
}

var xebra = new Xebra.State(options);
xebra.on("object_added", updateWithObject1);
xebra.on("object_changed", updateWithObject1);
//xebra.on("object_added", updateWithObject2);
//xebra.on("object_changed", updateWithObject2);
xebra.connect();

function sendToMax(val) {
 xebra.sendMessageToChannel("fromBrowser", val);

}

//sends an object from max to p5
function updateWithObject1(object1, param) {
  // console.log(object1)
  // console.log(param)
   console.log(object1.getParamValue("varname"))
   console.log(object1.getParamValue("value"))

  if (object1.getParamValue("varname") == "earth") {
    earth = object1.getParamValue("value");
    if (earth != null) {
      planets[3].planetStroke = earth*5;
    }
  } else if (object1.getParamValue("varname") == "mars") {
    mars = object1.getParamValue("value");
    if (mars != null) {
      if (mars == 1) planets[1].planetStroke = 5;
      else planets[1].planetStroke = 0;
    }
  }
     else if (object1.getParamValue("varname") == "jupiter") {
    jupiter = object1.getParamValue("value");
    if (jupiter != null) {
      if (jupiter == 1) planets[4].planetStroke = 5;
      else planets[4].planetStroke = 0;
    }
  }
     else if (object1.getParamValue("varname") == "neptune") {
      neptune = object1.getParamValue("value");
    if (neptune != null) {
      if (neptune == 1) planets[2].planetStroke = 5;
      else planets[2].planetStroke = 0;
    }
  }
    else if (object1.getParamValue("varname") == "uranus") {
    uranus = object1.getParamValue("value");
    if (uranus != null) {
      if (uranus == 1) planets[5].planetStroke = 5;
      else planets[5].planetStroke = 0;
    }
  }
    else if (object1.getParamValue("varname") == "mercury") {
      mercury = object1.getParamValue("value");
    if (mercury != null) {
      if (mercury == 1) planets[7].planetStroke = 5;
      else planets[7].planetStroke = 0;
    }
    }
    else if (object1.getParamValue("varname") == "venus") {
    venus = object1.getParamValue("value");
    if (venus != null) {
    if (venus == 1) planets[8].planetStroke = 5;
    else planets[8].planetStroke = 0;
    }
    }
    else if (object1.getParamValue("varname") == "saturn") {
      saturn = object1.getParamValue("value");
    if (saturn != null) {
      if (saturn == 1) planets[6].planetStroke = 5;
      else planets[6].planetStroke = 0;
    }
    }
}

function preLoad(){

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(backgroundColor);
  const centerX = width / 2;
  const centerY = height / 2;

  for (var i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
  

  menuX = (width - menuWidth) / 2;
  menuY = (height - menuHeight) / 2;

  planets = [
    //(positionX,positionY,size, color,stroke)
    //SUN
    new Planet(centerX, centerY, 300, color(255, 204, 0)),
    //MARS 1
    new Planet(centerX + windowWidth/6, centerY + 200, 60, color(200, 0, 0), 0, "rocky"),
    //NEPTUNE 2
    new Planet(centerX + windowWidth/2.5, centerY ,70, color(10, 102, 126), 0, "gasPlanets"),
    //EARTH 3
    new Planet(centerX - windowWidth/6, centerY + 30, 70, color(28, 36, 189), 0, "rocky"),
    //JUPITER 4
    new Planet(centerX + windowWidth/3.5, centerY - 300, 120, color(217, 186, 114), 0, "gasPlanets"),
    //URA 5
    new Planet(centerX - windowWidth/2.5, centerY + 200, 80, color(8, 131, 183), 0, "gasPlanets"),
    //SATURN 6
    new Planet(centerX - windowWidth/3.5, centerY + 300, 110, color(255, 209, 156), 0, "gasPlanets"),
    //MERCURY 7
    new Planet(centerX + windowWidth/12, centerY - 40, 40, color(233, 151, 22), 0, "rocky"),
    //VENUS 8
    new Planet(centerX - windowWidth/12, centerY, 50, color(197, 68, 37), 0, "rocky"),
  ];

  closeButtonX =1000 ;
  closeButtonY =380;

  rockyCloseButtonX = 385;  
  rockyCloseButtonY = 30;   

  gasPlanetsCloseButtonX = 1825;
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
  background(84, 88, 209);
  planets.forEach(planet => {
    planet.display();
  });

  fill(255);
  //rect(settingsButtonX, settingsButtonY, settingsButtonSize, settingsButtonSize);
  fill(0);
  textSize(32);
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
      //rect(closeButtonX, closeButtonY, closeButtonSize, closeButtonSize);
      fill(255);
      textSize(32);
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
      //rect(rockyCloseButtonX, rockyCloseButtonY, closeButtonSize, closeButtonSize);
      fill(255);
      textSize(32);
      textAlign(CENTER, CENTER);
      text('X', rockyCloseButtonX + closeButtonSize / 2, rockyCloseButtonY + closeButtonSize / 2);

      rockyBpmSlider.position(menuX + 250, menuY + 45);
      rockyRockVolumeSlider.position(menuX + 250, menuY + 85);
      rockyGasVolumeSlider.position(menuX + 250, menuY + 125);

      rockyBpmSlider.show();
      rockyRockVolumeSlider.show();
      rockyGasVolumeSlider.show();
    } else if (menuType === "gasPlanets") {
      fill(0);
      //rect(gasPlanetsCloseButtonX + windowWidth/2.5, gasPlanetsCloseButtonY , closeButtonSize, closeButtonSize,20,20,20,20);
      //fill(255);
      textSize(32);
      textAlign(gasPlanetsCloseButtonX, CENTER);
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

  //send message from p5 to max
  if (mouseIsPressed) {
    sendToMax("mars " + planets[1].y,);
    sendToMax("neptune " + planets[2].y);
    sendToMax("earth " + planets[3].y);
    sendToMax("jupiter " + planets[4].y);
    sendToMax("uranus " + planets[5].y);
    sendToMax("saturn " + planets[6].y);
    sendToMax("mercury " + planets[7].y);
    sendToMax("venus " + planets[8].y);

    //mouseIsPressed = false;
  }

}

function mousePressed() {
  planets.forEach(planet => {
    planet.startDragging();
  });

  //changes background
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
        menuX = windowWidth/1.3;
      }
    }
  });
}

function mouseReleased() {
  planets.forEach(planet => {
    planet.dragging = false;
  });
}


class Planet {
  constructor(x, y, size, planetColor, planetStroke, content = "") {
    this.x = x;
    this.y = y;
    this.size = size;
    this.planetColor = planetColor;
    this.dragging = false;
    this.angle = 0;
    this.radius = dist(this.x, this.y, width / 2, height / 2);
    this.content = content;
    this.offsetY = 0;
    this.planeStroke = planetStroke;
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
    speed = map(mouseX/2, 0, width, 1, 3);

    //translate(width / 2, height / 2);
    for (var i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].show();
    }
    
    stroke(0);
    strokeWeight(this.planetStroke);
    fill(this.planetColor);
    ellipse(this.x, this.y, this.size, this.size);
    if (this.dragging) {
      this.y = mouseY - this.offsetY;
      
    }

  }
}

