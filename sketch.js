var canvas, database;

var drawing = [];

var nowPath = [];

var isDrawing = false;

function setup() {
  database = firebase.database();

  canvas = createCanvas(displayWidth, displayHeight);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

  //var input = createInput("Name");
  //input.position(10, 640);

  //var saveButton = createButton("Save");
  //saveButton.position(30, 670);
  //saveButton.mousePressed(()=>{
    //saveDrawing();
    //input.hide();
    //saveButton.hide();
  //})

  var clearButton = createButton("Clear");
  clearButton.position(displayWidth-10, displayHeight-10);
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
  background("#0C0C0C");  
  if(isDrawing){
    var point = {
      x: mouseX,
      y: mouseY
    }
    nowPath.push(point);
  }

  //fill("cyan");
  //textSize(15);
  //text("Enter your name to save your drawing to the database", 10, 20);

  stroke("#A18CD1");
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

