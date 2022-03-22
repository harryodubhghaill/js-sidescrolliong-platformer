// Code from Jessica Torres on Level Up coding
// https://levelup.gitconnected.com/creating-a-simple-2d-game-with-html5-javascript-889aa06035ef

// Get canvas from DOM
const canvas = document.querySelector("canvas");

// resize canvas based on current viewport
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize()
window.addEventListener('resize', resize)

// Get canvas context
const ctx = canvas.getContext("2d");

// create collision data
const collisionMap = [];
for (let i = 0; i < collisions.length; i+=100) {
  collisionMap.push(collisions.slice(i, 100 + i));
}

const offset = {
  x: 0,
  y: -265
}

// intantiate boundary objects

const boundaries = []

collisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 375)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

console.log(boundaries)


// Add images and instantiate classes
const playerImage = new Image()
playerImage.src = '/img/knightspritesheet.png'

const platforms = new Image()
platforms.src = '/img/platform-map.png'

const playerChar = new Player({
  position: {
    x: 0,
    y: 0
  },

  velocity: {
    x: 0,
    y: 0
  },

  image: playerImage,

  crop : {
    xCropStart: 0,
    yCropStart: 0,
    xCropEnd: playerImage.width / 8,
    yCropEnd: playerImage.height,
  },

  jumping: true
})

const platformObject = new Map({
  position: {
    x: offset.x,
    y: offset.y
  },

  velocity: {
    x: 0,
    y: 0
  },

  image: platforms,
})

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
      case 32: // w key (up)
        controller.up = key_state;
        break;
      case 68: // d key (right)
        controller.right = key_state;
        break;
    }
  }
};

// Updates player character with direction info from controller
const animate = function() {
  if (controller.up && playerChar.jumping == false) {
    playerChar.velocity.y -= 20;
    playerChar.jumping = true;
  }
  if (controller.left) {
    playerChar.velocity.x -= 0.5;
  }
  if (controller.right) {
    playerChar.velocity.x += 0.5;
  }
  
  playerChar.velocity.y += 1.5; // gravity
  playerChar.position.x += playerChar.velocity.x;
  playerChar.position.y += playerChar.velocity.y;
  playerChar.velocity.x *= 0.9; // friction
  playerChar.velocity.y *= 0.9; // friction

  // if the player is falling below floor line, then:
  if (playerChar.position.y > ctx.canvas.height - 500) {
    playerChar.jumping = false;
    playerChar.position.y = ctx.canvas.height - 500;
    playerChar.velocity.y = 0;
  }

  // creates side scrolling effect
  if (playerChar.position.x < 20 && controller.left) {
    playerChar.position.x = 20;
    platformObject.position.x += 10
  } else if (playerChar.position.x > ctx.canvas.width/ 2 && controller.right) {
    playerChar.position.x = ctx.canvas.width/ 2;
    platformObject.position.x -= 10
  }

  // Creates the backdrop for each frame
  ctx.fillStyle = "#201A23";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); // x, y, width, height

  platformObject.draw()

  boundaries.forEach(boundary => {
    boundary.draw()
  })

  playerChar.draw()

  // Updates when called to tell the browser it is ready to draw again
  window.requestAnimationFrame(animate);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
// Start animation loop
window.requestAnimationFrame(animate);