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

const offset = {
  x: 0,
  y: -265
}

// create collision data

const collisionMap = [];
for (let i = 0; i < collisions.length; i+=100) {
  collisionMap.push(collisions.slice(i, 100 + i));
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


// Add images and instantiate classes
const playerImage = new Image()
playerImage.src = '/img/knightspritesheet.png'

const platforms = new Image()
platforms.src = '/img/platform-map.png'

const playerChar = new Player({
  position: {
    x: 50,
    y: 0
  },

  velocity: {
    x: 0,
    y: 0
  },

  image: playerImage,

  jumping: false,

  frames: {
    max: 8
  }
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
      case 32: // space (up)
        controller.up = key_state;
        break;
      case 68: // d key (right)
        controller.right = key_state;
        break;
    }
  }
};

let movables = [platformObject, ...boundaries]

// function rectangularCollision({rectangle1, rectangle2}) {
//   return(
//     rectangle1.position.x + (rectangle1.width - 16) >= rectangle2.position.x &&
//     (rectangle1.position.x - 16) <= rectangle2.position.x + rectangle2.width &&
//     rectangle1.position.y <= rectangle2.position.y &&
//     rectangle1.position.y + rectangle1.height >= rectangle2.position.y + rectangle2.height 
//   )
// }
// Updates player character with direction info from controller
const animate = function() {

  platformObject.draw()

  boundaries.forEach((boundary) => {
    boundary.draw()
  })

  // creates side scrolling effect
  if (playerChar.position.x < 20 && controller.left && platformObject.position.x <= -10) {
    playerChar.position.x = 20;
    movables.forEach((movable) => {
      movable.position.x += 10
    })
  } else if (playerChar.position.x > ctx.canvas.width/ 2 && controller.right && platformObject.position.x >= -2150) {
    playerChar.position.x = ctx.canvas.width/ 2;
    movables.forEach((movable) => {
      movable.position.x -= 10
    })
  }

  console.log(playerChar.jumping)

  playerChar.update()

  // Updates when called to tell the browser it is ready to draw again
  window.requestAnimationFrame(animate);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
// Start animation loop
window.requestAnimationFrame(animate);