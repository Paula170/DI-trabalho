let planets = [];
let backgroundColor = 0; 
let isBlue = true; 

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

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(backgroundColor);
  const centerX = width / 2;
  const centerY = height / 2;

  planets = [
    //(positionX,positionY,size, color,stroke)
    //SUN
    new Planet(centerX, centerY, 150, color(255, 204, 0), 0),
    //MARS 1
    new Planet(centerX + windowWidth/6, centerY + 200, 60, color(200, 0, 0), 0),
    //NEPTUNE 2
    new Planet(centerX + windowWidth/2.5, centerY ,70, color(10, 102, 126), 0),
    //EARTH 3
    new Planet(centerX - windowWidth/6, centerY + 30, 70, color(28, 36, 189), 0),
    //JUPITER 4
    new Planet(centerX + windowWidth/3.5, centerY - 300, 120, color(217, 186, 114), 0),
    //URA 5
    new Planet(centerX - windowWidth/2.5, centerY + 200, 80, color(8, 131, 183), 0),
    //SATURN 6
    new Planet(centerX - windowWidth/3.5, centerY + 300, 110, color(255, 209, 156), 0),
    //MERCURY 7
    new Planet(centerX + windowWidth/12, centerY - 40, 40, color(233, 151, 22), 0),
    //VENUS 8
    new Planet(centerX - windowWidth/12, centerY, 50, color(197, 68, 37), 0),
  ];
}

function draw() {
  background(84, 88, 209);
  planets.forEach(planet => {
    planet.display();
  });

  //send message from p5 to max
  if (mouseIsPressed) {
    sendToMax("mars: " + planets[1].y
    ,"neptune: " + planets[2].y,
    "earth: " + planets[3].y,
    "jupiter: " + planets[4].y,
    "uranus: " + planets[5].y,
    "saturn: " + planets[6].y,
    "mercury: " + planets[7].y,
    "venus: " + planets[8].y);

    //mouseIsPressed = false;
  }

}

function mousePressed() {
  //drags planets
  planets.forEach(planet => {
    planet.dragging = planet.contains(mouseX, mouseY);
    if (planet.dragging) {
      planet.offsetY = mouseY - planet.y;
    }
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
}

function mouseReleased() {
  planets.forEach(planet => {
    planet.dragging = false;
  });
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

