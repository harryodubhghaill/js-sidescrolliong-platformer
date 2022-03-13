// Code from Jessica Torres on Level Up coding
// https://levelup.gitconnected.com/creating-a-simple-2d-game-with-html5-javascript-889aa06035ef

// Get canvas from DOM
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.height = innerHeight;
ctx.canvas.width = innerWidth;


// Defines Player Character
const square = {
  height: 32,
  jumping: true,
  width: 32,
  x: 0,
  xVelocity: 0,
  y: 0,
  yVelocity: 0
};

// Gets input data from users keyboard
const controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(event) {
    let key_state = (event.type == "keydown") ? true : false;
    switch (event.keyCode) {
      case 65: // a key (left)
        controller.left = key_state;
        break;
      case 87: // w key (up)
        controller.up = key_state;
        break;
      case 68: // d key (right)
        controller.right = key_state;
        break;
    }
  }
};

// Updates player character with direction info from controller
const loop = function() {
  if (controller.up && square.jumping == false) {
    square.yVelocity -= 20;
    square.jumping = true;
  }
  if (controller.left) {
    square.xVelocity -= 0.5;
  }
  if (controller.right) {
    square.xVelocity += 0.5;
  }
  
  square.yVelocity += 1.5; // gravity
  square.x += square.xVelocity;
  square.y += square.yVelocity;
  square.xVelocity *= 0.9; // friction
  square.yVelocity *= 0.9; // friction

  // if the square is falling below floor line, then:
  if (square.y > 386 - 16 - 32) {
    square.jumping = false;
    square.y = 386 - 16 - 32;
    square.yVelocity = 0;
  }

  // creates loop at either side of canvas for character to circle around
  if (square.x < -20) {
    square.x = 1220;
  } else if (square.x > 1220) {
    square.x = -20;
  }

  // Creates the backdrop for each frame
  ctx.fillStyle = "#201A23";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); // x, y, width, height

  const platforms = new Image()
  platforms.src = '/img/platformMap.png'

  platforms.onload = drawPlatforms()
  function drawPlatforms() {
    ctx.drawImage(platforms, 0, -900)
  }

  // Creates and fills the cube for each frame
  ctx.fillStyle = "#8DAA9D"; // hex for cube color
  ctx.beginPath();
  ctx.rect(square.x, square.y, square.width, square.height);
  ctx.fill();

  // Creates the "ground" for each frame
  ctx.strokeStyle = "#2E2532";
  ctx.lineWidth = 30;
  ctx.beginPath();
  ctx.moveTo(0, 385);
  ctx.lineTo(1220, 385);
  ctx.stroke();

  // Updates when called to tell the browser it is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
// Start animation loop
window.requestAnimationFrame(loop);