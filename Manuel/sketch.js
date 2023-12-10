let planets = [];
let backgroundColor = 0;

let isBlue = false;
let prevBackgroundColor = backgroundColor;
let prevIsBlue = false; 

let stars = [];
var speed;

let mainMenu;
let gasMenu;
let rockMenu;

//start stop menus
/*let isStartScreen = true; // Variable to track if it's the start screen
let arrowButton; // Arrow button object
*/

var options = {
  hostname: "localhost",
  port: 8086,
  auto_connect: false,
}
var xebra = new Xebra.State(options);
xebra.on("object_added", updateWithObject1);
xebra.on("object_changed", updateWithObject1);
xebra.connect();
function sendToMax(val) {
 xebra.sendMessageToChannel("fromBrowser", val);
}
//sends an object from max to p5
function updateWithObject1(object1, param) {
  if (object1.getParamValue("varname") == "earth") {
    earth = object1.getParamValue("value");
    if (earth != null) {
      if (earth == 1) planets[3].planetStroke = 150;
      else planets[3].planetStroke = 255;
    }
  } else if (object1.getParamValue("varname") == "mars") {
    mars = object1.getParamValue("value");
    if (mars != null) {
      if (mars == 1) planets[1].planetStroke = 150;
      else planets[1].planetStroke = 255;
    }
  }
     else if (object1.getParamValue("varname") == "jupiter") {
      jupiter = object1.getParamValue("value");
    if (jupiter != null) {
      if (jupiter == 1) planets[4].planetStroke = 150;
      else planets[4].planetStroke = 255;
    }
  }
     else if (object1.getParamValue("varname") == "neptune") {
      neptune = object1.getParamValue("value");
    if (neptune != null) {
      if (neptune == 1) planets[2].planetStroke = 150;
      else planets[2].planetStroke = 255;
    }
  }
    else if (object1.getParamValue("varname") == "uranus") {
      uranus = object1.getParamValue("value");
    if (uranus != null) {
      if (uranus == 1) planets[5].planetStroke = 150;
      else planets[5].planetStroke = 255;
    }
  }
    else if (object1.getParamValue("varname") == "mercury") {
      mercury = object1.getParamValue("value");
    if (mercury != null) {
      if (mercury == 1) planets[7].planetStroke = 150;
      else planets[7].planetStroke = 255;
    }
  }
    else if (object1.getParamValue("varname") == "venus") {
      venus = object1.getParamValue("value");
    if (venus != null) {
    if (venus == 1) planets[8].planetStroke = 150;
    else planets[8].planetStroke = 255;
    }
  }
    else if (object1.getParamValue("varname") == "saturn") {
      saturn = object1.getParamValue("value");
    if (saturn != null) {
      if (saturn == 1) planets[6].planetStroke = 150;
      else planets[6].planetStroke = 255;
    }
  }
}

let planetImages  = [];
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
function preload() {
  planetImages.push(loadImage("images/mars.png"));
  planetImages.push(loadImage("images/neptune.png"));
  planetImages.push(loadImage("images/earth.png"));
  planetImages.push(loadImage("images/jupiter.png"));
  planetImages.push(loadImage("images/uranus.png"));
  planetImages.push(loadImage("images/saturn.png"));
  planetImages.push(loadImage("images/mercury.png")); 
  planetImages.push(loadImage("images/venus.png")); 
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
  mainMenu = new Menu("main", "BPM", "Main Volume", "Wide",["volume", "BPM", "more"]);
  rockMenu = new Menu("rock", "Rock Volume", "Gravity", "Filter",["volume", "slow-mo", "signal"]);
  gasMenu = new Menu("gas", "Gas Volume", "Gravity", "Filter",["volume", "slow-mo", "glitch"]);
  planets = [
    //(positionX,positionY,size, color,stroke)
    //SUN
    new Planet(0, centerX, centerY, 300, color(255, 204, 0)),
    //MARS 1
    new Planet(1, centerX + windowWidth / 6, centerY + 200, 60, color(200, 0, 0), 0,"Rock", planetImages[0]),
    //NEPTUNE 2
    new Planet(2, centerX + windowWidth / 2.5, centerY, 70, color(10, 102, 126), 0, "Gas", planetImages[1]),
    //EARTH 3
    new Planet(3, centerX - windowWidth / 6, centerY + 30, 70,color(28, 36, 189),0,"Rock", planetImages[2]),
    //JUPITER 4
    new Planet(4,centerX + windowWidth / 3.5,centerY - 300,120,color(217, 186, 114),0,"Gas", planetImages[3]),
    //URA 5
    new Planet(5,centerX - windowWidth / 2.5,centerY + 200, 80, color(8, 131, 183), 0, "Gas", planetImages[4]),
    //SATURN 6
    new Planet(6, centerX - windowWidth / 3.5, centerY + 300, 110, color(255, 209, 156), 0,"Gas", planetImages[5]),
    //MERCURY 7
    new Planet(7, centerX + windowWidth / 12, centerY - 40, 40, color(233, 151, 22), 0, "Rock", planetImages[6]),
    //VENUS 8
    new Planet(8,centerX - windowWidth / 12, centerY, 50, color(197, 68, 37), 0, "Rock", planetImages[7]),
  ];

  
  //making text centered to cordinated
  textAlign(CENTER, CENTER);
  imageMode(CENTER,CENTER);
}
function draw() {
  background(backgroundColor);

  speed = map(mainMenu.gravity.value(), 0, 127, 1, 50);
  drawStars();

  planets.forEach((planet) => {
    planet.display();
  });
  //menu icon
  //three lines
  push();
  stroke(255);
  noFill();
  strokeWeight(6);
  translate(width/2,height-80)
  circle(0,0,40,40);
  for(let a=0;a<10;a++){
    rotate(TWO_PI/10);
    line(0,32,0,38);
  }
  pop();
  if(mouseIsPressed){
    
    //menu values
    sendToMax("main1 " + mainMenu.vol.value());
    sendToMax("main2 " + mainMenu.gravity.value());
    sendToMax("main3 " + mainMenu.vaccume.value());
    sendToMax("rock1 " + rockMenu.vol.value());
    sendToMax("rock2 " + rockMenu.gravity.value());
    sendToMax("rock3 " + rockMenu.vaccume.value());
    sendToMax("gas1 " + gasMenu.vol.value());
    sendToMax("gas2 " + gasMenu.gravity.value());
    sendToMax("gas3 " + gasMenu.vaccume.value());
    //planet values
    /*
    sendToMax("mars " + floor(planets[1].y/(height/8)));
    sendToMax("neptune " + floor(planets[2].y/(height/8)));
    sendToMax("earth " + floor(planets[3].y/(height/8)));
    sendToMax("jupiter " + floor(planets[4].y/(height/8)));
    sendToMax("uranus " + floor(planets[5].y/(height/8)));
    sendToMax("saturn " + floor(planets[6].y/(height/8)));
    sendToMax("mercury " + floor(planets[7].y/(height/8)));
    sendToMax("venus " + floor(planets[8].y/(height/8)));
    */
    //sun in out
    //sendToMax("sun " + isBlue);
    //makeWhiteBorder.display();
    
    let names = ["mars","neptune","earth","jupiter","uranus","saturn","mercury","venus"];
    for(let i=0;i<names.length;i++){
      let p  = planets[i+1];
      sendToMax(names[i]+" "+floor(p.y/(height/8))+" "+p.planetStroke);
    }
    mouseIsPressed=false;
    if(dist(mouseX,mouseY,width/2,height-80)<40){
      if(mainMenu.showMenu){
        mainMenu.showMenu = false;
        mainMenu.vol.hide();
        mainMenu.gravity.hide();
        mainMenu.vaccume.hide();
        mainMenu.crossBtn.hide();
      }else{
        mainMenu.showMenu = true;
        mainMenu.vol.show();
        mainMenu.gravity.show();
        mainMenu.vaccume.show();
        mainMenu.crossBtn.show();
      }
    }
    const isBlue = JSON.stringify(backgroundColor.levels) === JSON.stringify([40, 89, 137, 255]);
    if (prevIsBlue !== isBlue) {
      console.log('Background color changed:', isBlue);
      sendToMax("sun " + isBlue);
      prevIsBlue = isBlue; // Update the previous condition
    }
}
if(mouseIsPressed){}
}
function mousePressed() {
  planets.forEach((planet) => {
    planet.startDragging();
  });
}
function doubleClicked() {
  planets.forEach((planet) => {
    if (planet.contains(mouseX, mouseY) && planet.menu!=mainMenu) {
      if (!planet.menu.showMenu) {
        planet.menu.showMenu = true;
        planet.menu.vol.show();
        planet.menu.gravity.show();
        planet.menu.vaccume.show();
        planet.menu.crossBtn.show();
      } else {
        planet.menu.showMenu = false;
        planet.menu.vol.hide();
        planet.menu.gravity.hide();
        planet.menu.vaccume.hide();
        planet.menu.crossBtn.hide();
      }
    }
  });
}
function mouseReleased() {
  planets.forEach((planet) => {
    planet.dragging = false;
  });
}
class Menu {
  constructor(label, l1, l2, l3,names=["volume", "gravity", "vaccume"]) {
    this.l1 = l1;
    this.l2 = l2;
    this.l3 = l3;
    this.showMenu = false;
    this.label = label;
    if (label == "main") {
      this.x = windowWidth / 2 - windowWidth / 5 / 2;
      this.y = windowWidth / 200;
    } else if (label == "rock") {
      this.x = windowWidth / 200;
      this.y = windowWidth / 200;
    } else {
      this.x = windowWidth - windowWidth / 200 - windowWidth / 5;
      this.y = windowWidth / 200;
    }
    //we will make sliders for vol gravity vaccum
    this.vol = createSlider(0, 127, 110, 1)
      .hide()
      .size((windowWidth / 5) * 0.65);
    this.vol.elt.addEventListener("input", function(evt){
      //console.log("teste " + mainMenu.vol.value());
      if (this.label == "main") {
        console.log("main:  " + mainMenu.vol.value());
        sendToMax("main1 " + mainMenu.vol.value());
      } else if  (this.label == "rock") {
        console.log("rock:  " + rockMenu.vol.value());
        sendToMax("rock1 " + rockMenu.vol.value());
      } else {
        console.log("gas:  " + gasMenu.vol.value());
        sendToMax("gas1 " + gasMenu.vol.value());
      }
    }.bind(this));
    this.gravity = createSlider(0, 127, 63, 1)
      .hide()
      .size((windowWidth / 5) * 0.65);
      this.gravity.elt.addEventListener("input", function(evt){
        //console.log("teste " + mainMenu.vol.value());
        if (this.label == "main") {
          console.log("main:  " + mainMenu.gravity.value());
          sendToMax("main2 " + mainMenu.gravity.value());
        } else if  (this.label == "rock") {
          console.log("rock:  " + rockMenu.gravity.value());
          sendToMax("rock2 " + rockMenu.gravity.value());
        } else {
          console.log("gas:  " + gasMenu.gravity.value());
          sendToMax("gas2 " + gasMenu.gravity.value());
        }
      }.bind(this));
    this.vaccume = createSlider(0, 127, 0, 1)
      .hide()
      .size((windowWidth / 5) * 0.65);
    this.sliders = [this.vol, this.gravity, this.vaccume];
    //so it goes from 0-1 , whose current value is 0.5 and step is 0.01
    this.vaccume.elt.addEventListener("input", function(evt){
      //console.log("teste " + mainMenu.vol.value());
      if (this.label == "main") {
        console.log("main:  " + mainMenu.vaccume.value());
        sendToMax("main3 " + mainMenu.vaccume.value());
      } else if  (this.label == "rock") {
        console.log("rock:  " + rockMenu.vaccume.value());
        sendToMax("rock3 " + rockMenu.vaccume.value());
      } else {
        console.log("gas:  " + gasMenu.vaccume.value());
        sendToMax("gas3 " + gasMenu.vaccume.value());
      }
    }.bind(this));

    this.crossBtn = createButton("x")
      .hide()
      .size((windowWidth / 5) * 0.1, (windowWidth / 5) * 0.1)
      .hide();
    this.crossBtn.mouseClicked(() => {
      this.showMenu = false;
      this.vol.hide();
      this.gravity.hide();
      this.vaccume.hide();
      this.crossBtn.hide();
    });
    this.names= names;
  }
  display() {
    if (this.showMenu) {
      fill(40);
      noStroke();
      rect(this.x, this.y, windowWidth / 5, windowHeight / 5);
      push();
      stroke(40);
      fill(255);
      textSize(16);
      text(
        this.label.toUpperCase(),
        this.x + windowWidth / 10,
        this.y + (windowHeight / 5) * 0.2
      );
      textSize(12);
      let names = this.names;
      for (let i = 0; i < 3; i++) {
        let x = this.x + (windowWidth / 5) * 0.3;
        let y =
          this.y +
          map(i, 0, 2, (windowHeight / 5) * 0.4, (windowHeight / 5) * 0.8);
        this.sliders[i].position(x, y);
        text(names[i], this.x + (windowWidth / 5) * 0.15, y + 8);
      }
      pop();
      this.crossBtn.position(
        this.x + windowWidth / 5 - (windowWidth / 5) * 0.15,
        this.y + (windowWidth / 5) * 0.05
      );
    }
  }
}
class Planet {
  constructor(id, x, y, size, planetColor, planetStroke, content = "",img = undefined) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.planetColor = planetColor;
    this.dragging = false;
    this.angle = 0;
    this.radius = dist(this.x, this.y, width / 2, height / 2);
    this.content = content;
    this.offsetY = 0;
    //this.planeStroke = planetStroke;
    if(img){
      this.planetStroke = planetStroke;
    }
    this.img = img;

    if(this.img){
      this.borderImg = makeWhiteBorder(img,this.planetStroke);
    }

    if (id == 0) {
      this.draggable = false;
      this.menu = mainMenu;
    } else {
      this.draggable = true;
      if (content == "Rock") this.menu = rockMenu;
      else this.menu = gasMenu;
    }
    this.stepChange = false;
    this.yPrev = this.y;
  }
  startDragging() {
    
      if (this.contains(mouseX, mouseY) && this.draggable) {
        this.dragging = true;
      } else if (this.contains(mouseX, mouseY) && !this.draggable) {
        if (isBlue) {
          backgroundColor = color(40, 89, 137);
        } else {
          backgroundColor = color(47, 43, 69);
        }
      }
    isBlue=!isBlue;
  }
  
  stopDragging() {
    this.dragging = false;
  }
  contains(px, py) {
    const d = dist(px, py, this.x, this.y);
    return d < this.size / 2;
  }
  display() {
    stroke(0);
    //strokeWeight(this.planetStroke);
    
    if(this.img) {
      //function to make the image white and draw before it so it acts as a border
      
      tint(this.planetStroke);
      image(this.borderImg,this.x,this.y,this.size*1.05*1.1,this.size*1.1);
      image(this.img,this.x,this.y,this.size*1.05,this.size);
    }else{
      fill(this.planetColor);
      ellipse(this.x, this.y, this.size, this.size);
    }
    if (this.dragging) {
      let unit = height/8;
      if(mouseY<unit){
        mouseY=unit;
      }
      if(mouseY>=height-unit){
        mouseY = height-unit;
      }
      this.yfake= (mouseY - this.offsetY+unit/2);
      this.y = this.yfake - (this.yfake%unit);
      if(this.yPrev!=this.y){
        this.yPrev=this.y;
        this.stepChange=true;
      }
      if(this.stepChange){
        console.log(this.y/unit);
        sendToMax("mars " + floor(planets[1].y/(height/8)));
        sendToMax("neptune " + floor(planets[2].y/(height/8)));
        sendToMax("earth " + floor(planets[3].y/(height/8)));
        sendToMax("jupiter " + floor(planets[4].y/(height/8)));
        sendToMax("uranus " + floor(planets[5].y/(height/8)));
        sendToMax("saturn " + floor(planets[6].y/(height/8)));
        sendToMax("mercury " + floor(planets[7].y/(height/8)));
        sendToMax("venus " + floor(planets[8].y/(height/8)));
        //here is the step change even happens, if supposed you where to add event listner change to the planet steps
        this.stepChange=false;
      }
    }
    

    this.menu.display();
  }
}
function makeWhiteBorder(img,planetStroke){
  let res = createImage(img.width,img.height);
  img.loadPixels();
  res.loadPixels();
  for(let x =0;x<img.width;x++){
    for(let y=0;y<img.height;y++){
      let index = (x + y * img.width) * 4;
      if(img.pixels[index+3]>0){
        res.pixels[index]= 255;
        res.pixels[index+1]= 255;
        res.pixels[index+2]= 255;
        res.pixels[index+3]= 0;
      }
    }
  }
  
  res.updatePixels();
  img.updatePixels();
  return res;
}
/*
class ArrowButton {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    fill(255);
    beginShape();
    vertex(this.x - this.size / 2, this.y - this.size / 2);
    vertex(this.x + this.size / 2, this.y);
    vertex(this.x - this.size / 2, this.y + this.size / 2);
    endShape(CLOSE);
  }

  contains(px, py) {
    return px > this.x - this.size / 2 &&
      px < this.x + this.size / 2 &&
      py > this.y - this.size / 2 &&
      py < this.y + this.size / 2;
  }
}*/