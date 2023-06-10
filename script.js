// Setup Paper.js
var canvas = document.getElementById('canvas');
canvas.width = 600;
canvas.height = 400;


paper.setup(canvas);

// Create 3 rectangles
var rectangles = [];
for (let i = 0; i < 3; i++) {
  let point = new paper.Point(70 + 85 * i, 85);
  let rect = new paper.Path.Rectangle({
    point: point,
    size: [75, 75],
    strokeColor: 'red',
    fillColor: 'blue'
  });
  rectangles.push(rect);
}

// Draw the view:
paper.view.draw();

// Create a frame loop
paper.view.onFrame = function(event) {

  // Update rotations and hues of rectangles

  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].fillColor.hue += 3 * i + 1;
    rectangles[i].rotate(3 * i + 1);
  }
}

