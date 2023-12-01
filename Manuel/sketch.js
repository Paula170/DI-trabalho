let planets = [];
let backgroundColor = 0; 
let isBlue = false; 

let stars = [];
var speed;

let mainMenu;
let gasMenu;
let rockMenu;

let round = [];

/*
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
   //console.log(object1.getParamValue("varname"))
   //console.log(object1.getParamValue("value"))

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
*/

function drawStars() {
  push();
  translate(width / 2, height / 2);

  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
  pop();
}

//for image load
function preLoad(){
  for (let i = 0; i < 8; i++){
    round[i] = loadImage('images/planet' + i + '.png');
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(40, 89, 137);
  const centerX = width / 2;
  const centerY = height / 2;

  for (var i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
  
  //menu types
  mainMenu = new Menu("main","BPM","Main Volume","Wide");
  rockMenu = new Menu("rock","Rock Volume","Gravity","Filter");
  gasMenu = new Menu("gas","Gas Volume","Gravity","Filter");

  planets = [
    //(positionX,positionY,size, color,stroke)
    //SUN
    new Planet(0,centerX, centerY, 300, color(255, 204, 0)),
    //MARS 1
    new Planet(1,centerX + windowWidth/6, centerY + 200, 60, color(200, 0, 0), 0, "Rock", "1"),
    //NEPTUNE 2
    new Planet(2,centerX + windowWidth/2.5, centerY ,70, color(10, 102, 126), 0, "Gas", 2),
    //EARTH 3
    new Planet(3,centerX - windowWidth/6, centerY + 30, 70, color(28, 36, 189), 0, "Rock", 3),
    //JUPITER 4
    new Planet(4,centerX + windowWidth/3.5, centerY - 300, 120, color(217, 186, 114), 0, "Gas", 4),
    //URA 5
    new Planet(5,centerX - windowWidth/2.5, centerY + 200, 80, color(8, 131, 183), 0, "Gas", 5),
    //SATURN 6
    new Planet(6,centerX - windowWidth/3.5, centerY + 300, 110, color(255, 209, 156), 0, "Gas", 6),
    //MERCURY 7
    new Planet(7,centerX + windowWidth/12, centerY - 40, 40, color(233, 151, 22), 0, "Rock", 7),
    //VENUS 8
    new Planet(8,centerX - windowWidth/12, centerY, 50, color(197, 68, 37), 0, "Rock", 8),
  ];

}

function draw() {
  background(backgroundColor);

  speed = map(mouseX/2, 0, width, 1, 50);
  drawStars();

  planets.forEach(planet => {
    planet.display();
  });




}

function mousePressed() {
  planets.forEach(planet => {
    planet.startDragging();
  });

}

function doubleClicked() {
  planets.forEach(planet => {
    if (planet.contains(mouseX, mouseY)) {
      planet.menu.showMenu = true;
      console.log("here");
    }
  });
}

function mouseReleased() {
  planets.forEach(planet => {
    planet.dragging = false;
  });
}

class Menu {

  constructor(label,l1,l2,l3) {
    this.l1 = l1;
    this.l2 = l2;
    this.l3 = l3;
    this.showMenu = false;
    if (label == "main") {
      this.x = windowWidth/2 -windowWidth/5/2;
      this.y = windowWidth/200;
    }
    else if (label == "rock") {
      this.x = windowWidth/200;
      this.y = windowWidth/200;
    }
    else {
      this.x = windowWidth-windowWidth/200-windowWidth/5;
      this.y = windowWidth/200;
    }
  }

   //menu display
  display() {
    if (this.showMenu) {
      fill(255);
      noStroke();
      rect(this.x,this.y,windowWidth/5,windowHeight/5);
      fill(0);
      text(this.l1,10,10);

      rect(this.x,this.y,windowWidth/5,windowHeight/300);
      rect(this.x,this.y+100,windowWidth/5,windowHeight/300);
      rect(this.x,this.y+200,windowWidth/5,windowHeight/300);

      fill(200,0,0);
      circle(this.x+windowWidth/5-windowWidth/150,this.y+windowWidth/150,windowWidth/120);
      
    }
    
   
  }
}

class Planet {
  constructor(id,x, y, size, planetColor, planetStroke, content = "", img = "") {
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
    this.round = img;

    if (id == 0) {
      this.draggable = false;
      this.menu = mainMenu;
    } 
    else {
      this.draggable = true;
      if (content == "Rock") this.menu = rockMenu;
      else this.menu = gasMenu;
  }
}

  startDragging() {
    if (this.contains(mouseX, mouseY) && this.draggable) {
      this.dragging = true;
    }
    
    else if (this.contains(mouseX, mouseY) && this.draggable == false) {
      
    if (isBlue) {
      backgroundColor = color(40, 89, 137); 
    } else {
      backgroundColor = color(47, 43, 69); 
    }
  }
    isBlue = !isBlue;
  }

  stopDragging() {
    this.dragging = false;
  }

 /*
  planet arcs
  update() {
    if (this.dragging) {
      this.angle = atan2(mouseY - height / 2, mouseX - width / 2);
      this.x = width / 2 + this.radius * cos(this.angle);
      this.y = height / 2 + this.radius * sin(this.angle);
    }
  }
  */

  contains(px, py) {
    const d = dist(px, py, this.x, this.y);
    return d < this.size / 2;
  }

  //planet display
  display() {
    
    stroke(0);
    strokeWeight(this.planetStroke);
    
    fill(this.planetColor);
    ellipse(this.x, this.y, this.size, this.size,this.round);
    if (this.dragging) {
      this.y = mouseY - this.offsetY
     
    }

    this.menu.display();
    
    //image(this.round,this.x,this.y);
    
  }
}

