let circles = [
  { x: 100, y: 300, clicked: false },
  { x: 200, y: 100, clicked: false },
  { x: 300, y: 300, clicked: false },
];
let connectedCircles = [];

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  // Clear the background
  background(220);

  // Set border color and thickness
  stroke(0);
  strokeWeight(1);

  // Set fill color with transparency
  fill(100, 100, 255, 150); // RGB color with alpha (transparency) value

  // Define vertices of the triangle
  let x1 = circles[0].x;
  let y1 = circles[0].y;
  let x2 = circles[1].x;
  let y2 = circles[1].y;
  let x3 = circles[2].x;
  let y3 = circles[2].y;

  // Draw dashed lines for the triangle sides
  drawDashedLine(x1, y1, x2, y2, 6);
  drawDashedLine(x2, y2, x3, y3, 6);
  drawDashedLine(x3, y3, x1, y1, 6);

  // Draw solid lines between connected circles
  for (let i = 0; i < connectedCircles.length - 1; i++) {
    let circle1 = connectedCircles[i];
    let circle2 = connectedCircles[i + 1];
    line(circle1.x, circle1.y, circle2.x, circle2.y);
  }

  // Draw centered circles at each corner
  for (let circle of circles) {
    drawCenteredCircle(circle.x, circle.y, circle.clicked);
    if (dist(mouseX, mouseY, circle.x, circle.y) <= 13) {
      cursor(HAND);
    }
  }
}

// Function to draw a dashed line between two points
function drawDashedLine(x1, y1, x2, y2, dashLength) {
  let distance = dist(x1, y1, x2, y2);
  let dashCount = distance / dashLength;

  let xStep = (x2 - x1) / dashCount;
  let yStep = (y2 - y1) / dashCount;

  for (let i = 0; i < dashCount; i++) {
    if (i % 2 === 0) {
      line(
        x1 + i * xStep,
        y1 + i * yStep,
        x1 + (i + 1) * xStep,
        y1 + (i + 1) * yStep
      );
    }
  }
}

// Function to draw a centered circle
function drawCenteredCircle(x, y, clicked) {
  let circleSize = 26;
  let innerCircleSize = 8; // Size of the inner black circle
  let padding = 2; // Padding between the white and black circles
  let halfSize = circleSize / 2;

  if (clicked) {
    fill(0);
    ellipse(x, y, circleSize, circleSize);
    fill(255);
    ellipse(x, y, circleSize - padding * 2, circleSize - padding * 2); // Draw the white circle with padding
    fill(0);
    ellipse(x, y, innerCircleSize, innerCircleSize);
  } else {
    fill(255);
    ellipse(x, y, circleSize, circleSize);
  }
}

function mousePressed() {
  let closestCircle = circles.reduce((acc, circle) => {
    let d = dist(mouseX, mouseY, circle.x, circle.y);
    return d <= dist(mouseX, mouseY, acc.x, acc.y) ? circle : acc;
  }, circles[0]);

  closestCircle.clicked = !closestCircle.clicked;
  updateConnectedCircles();
}

function updateConnectedCircles() {
  connectedCircles = circles.filter((circle) => circle.clicked);
}
