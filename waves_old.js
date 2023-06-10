// Setup Paper.js
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


canvasWidth = window.innerWidth;
canvasHeight = window.innerHeight;

// how much to lower or raise wave based on key press
var dir = 0
var count = 5

// paper.setup(new paper.Size(1000, 1000))
paper.setup(canvas);
var width, height, center;
var points = 10;
var smooth = true;
var path = new paper.Path();
var mousePosY = paper.view.center._y / 2;
var mousePosX = paper.view.center._x / 2;
var mousePos = new
  paper.Point(mousePosY, mousePosX)

var pathHeight = mousePos.y;
path.fillColor = 'red';




// Define the minimum size of the shapes (1/3 of the screen)
var minSize = Math.min(canvasWidth, canvasHeight) / 3;

function initializePath() {
  center = paper.view.center;
  width = paper.view.size.width;
  height = paper.view.size.height / 2;

  path.segments = [];
  path.add(paper.view.bounds.bottomLeft);
  for (var i = 1; i < points; i++) {
    var point = new paper.Point(width / points * i, center.y);
    path.add(point);
  }
  path.add(paper.view.bounds.bottomRight);
  path.fullySelected = true;
  console.log(path)
}

paper.view.onFrame = function(event) {
  if (paper.Key.isDown('down')) {
    path.fillColor.hue += 1;
    dir--;
  } else if (paper.Key.isDown('up')) {
    path.fillColor.hue -= 1;
    dir++;
  }

  pathHeight += (center.y - mousePos.y - pathHeight) / 10 + dir
  for (var i = 1; i < points; i++) {
    var sinSeed = event.count + (i + i % 10) * 100;
    var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
    var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
    path.segments[i].point.y = yPos;
  }
  if (smooth)
    path.smooth({ type: 'continuous' });
}

var width, height, center;
var points = 10;
var smooth = true;
var path = new paper.Path();
var mousePosY = paper.view.center._y / 2;
var mousePosX = paper.view.center._x / 2;
var mousePos = new
  paper.Point(mousePosY, mousePosX)

var pathHeight = mousePos.y;
path.fillColor = 'red';

initializePath();

paper.view.onMouseMove = function(event) {
  mousePos = event.point;
}

// function onMouseDown(event) {
paper.view.onMouseDown = function(event) {
  smooth = !smooth;
  if (!smooth) {
    // If smooth has been turned off, we need to reset
    // the handles of the path:
    for (var i = 0, l = path.segments.length; i < l; i++) {
      var segment = path.segments[i];
      segment.handleIn = segment.handleOut = null;
    }
  }
}
// Create a centered text item at the center of the view:
var text = new paper.PointText({
  point: paper.view.center,
  // content: 'Click here to focus and then press some keys.',
  justification: 'center',
  fontSize: 15
});


// function onKeyDown(event) {
paper.view.onKeyDown = function(event) {
  // When a key is pressed, set the content of the text item:
  text.content = 'The ' + event.key + ' key was pressed!';
}

// function onKeyUp(event) {
paper.view.onKeyUp = function(event) {
  // When a key is released, set the content of the text item:
  text.content = 'The ' + event.key + ' key was released!';
}



// Reposition the path whenever the window is resized:
function onResize(event) {
  initializePath();
}