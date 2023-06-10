var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvasWidth = window.innerWidth;
canvasHeight = window.innerHeight;

var dir = 0;
var count = 5;

paper.setup(canvas);
var width, height, center;
var points = 10;
var smooth = true;
var paths = []; // Array to store the wave paths
var mousePosY = paper.view.center._y / 2;
var mousePosX = paper.view.center._x / 2;
var mousePos = new
  paper.Point(mousePosY, mousePosX)
center = paper.view.center;
width = paper.view.size.width;

var cols = ['red', 'blue', 'green', 'black', 'purple']

function initializePath() {
  for (var j = 0; j < count; j++) {
    var wavePath = new paper.Path(); // Create a new path for each wave
    var hue = j * (360 / count); // Calculate the hue based on the wave index
    // wavePath.fillColor = { hue: hue, saturation: 1, brightness: 1 };
    wavePath.fillColor = {
      hue: hue,
      saturation: 1,
      brightness: 1,
      alpha: 0.1 // Set the alpha value for transparency
    };


    // height = paper.view.size.height / (j + 1);
    height = paper.view.size.height / (count - j); // fix here
    wavePath.add(paper.view.bounds.bottomLeft);
    for (var i = 1; i < points; i++) {
      var point = new paper.Point(width / points * i, height);
      wavePath.add(point);
    }
    wavePath.add(paper.view.bounds.bottomRight);
    // wavePath.fullySelected = true;
    // console.log(wavePath)
    paths.push(wavePath)
    console.log("hue", hue)
  }
}
initializePath();
// console.log(paths)
paper.view.onFrame = function(event) {
  if (paper.Key.isDown('down')) {
    paths.forEach(function(path) {
      path.fillColor.hue += 1;
    });
    dir--;
  } else if (paper.Key.isDown('up')) {
    paths.forEach(function(path) {
      path.fillColor.hue -= 1;
    });
    dir++;
  }
  let j = 1
  paths.forEach(function(path) {
    var pathHeight = path.segments[1].point.y;
    var height = path.bounds.height / j;

    pathHeight += (center.y - mousePos.y - pathHeight) / 10 + dir;
    // path.fillColor = cols[j];

    for (var i = 1; i < points; i++) {
      var sinSeed = event.count + (i + i % 10) * 100;
      var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
      var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
      path.segments[i].point.y = yPos;
    }
    j++
    if (smooth)
      path.smooth({ type: 'continuous' });
    console.log(path.fillColor)

  });
  j = 0;
};

paper.view.onMouseMove = function(event) {
  mousePos = event.point;
};

paper.view.onMouseDown = function(event) {
  smooth = !smooth;
  if (!smooth) {
    paths.forEach(function(path) {
      for (var i = 0, l = path.segments.length; i < l; i++) {
        var segment = path.segments[i];
        segment.handleIn = segment.handleOut = null;
      }
    });
  }
};

// var text = new paper.PointText({
//   point: paper.view.center,
//   justification: 'center',
//   fontSize: 15
// });

// paper.view.onKeyDown = function(event) {
//   // text.content = 'The ' + event.key + ' key was pressed!';
//   text.content = 'The ' + event.key + ' key was pressed!';

// };

// paper.view.onKeyUp = function(event) {
//   text.content = 'The ' + event.key + ' key was released!';
// };


var text = new paper.PointText({
  point: paper.view.center,
  justification: 'center',
  fontSize: 24,
  fontFamily: 'monospace',
  content: `Meditation: Up arrow on inhale. Pause. Down arrow on exhale. Pause.`
});

// Create a text item
// var text2 = new PointText({
//   content: 'Meditative Breathing: Press up arrow on inhale. Pause. Press down arrow on exhale.',
//   point: view.left,
//   justification: 'left',
//   fontSize: 24,
//   fontFamily: 'monospace'
// });


var breathCount = 0
paper.view.onKeyDown = function(event) {
  if (event.key === 'up') {
    text.content = 'inhale';
    breathCount++
  } else if (event.key === 'down') {
    text.content = 'exhale';
    breathCount ++
  } else {
    // text.content = 'Meditative Breathing: Press up arrow on inhale. Pause. Press down arrow on exhale.';
  }
};

paper.view.onKeyUp = function(event) {
  // text.content = 'pause';
  var newText = ''
  if (breathCount % 2 === 1)
  {
    newText = ` (then press down and exhale)`
  }
  else 
  {
    newText = ` (then press up and inhale)`
    
  }
  text.content = 'pause' + newText;
  
};

paper.project.activeLayer.addChild(text);
paper.project.activeLayer.addChild(text2);

function onResize(event) {
  initializePath();
}

