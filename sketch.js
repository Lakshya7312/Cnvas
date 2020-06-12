var canvas, database;

var drawing = [];

var nowPath = [];

var isDrawing = false;

function setup() {
  database = firebase.database();

  canvas = createCanvas(1600, 700);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

  var input = createInput("Name");
  input.position(10, 640);

  var saveButton = createButton("Save");
  saveButton.position(30, 670);
  saveButton.mousePressed(()=>{
    saveDrawing();
    input.hide();
    //saveButton.hide();
  })

  var clearButton = createButton("Clear");
  clearButton.position(1500, 670);
  clearButton.mousePressed(clearDrawing);
}

function startPath() {
  isDrawing = true;
  nowPath = [];
  drawing.push(nowPath);
}

function endPath() {
  isDrawing = false;
}

function draw() {
  background("black");  
  if(isDrawing){
    var point = {
      x: mouseX,
      y: mouseY
    }
    nowPath.push(point);
  }

  fill("cyan");
  textSize(15);
  text("Enter your name to save your drawing to the database", 10, 20);

  stroke("yellow");
  strokeWeight(5);
  noFill();
   for(var i = 0; i < drawing.length; i++){
     var path = drawing[i];
     beginShape();
    for(var l = 0; l < path.length; l++){
     vertex(path[l].x, path[l].y);
    }
    endShape();
   }
   
}

function saveDrawing() {
var ref = database.ref('drawings');
var data = {
  name: name,
  drawing: drawing
}
ref.push(data);
};

function clearDrawing() {
drawing = [];
}

