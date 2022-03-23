class Map {
  constructor({image, position, velocity}){
    this.position = position
    this.velocity = velocity
    this.image = image
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y)
  }
}

class Player {
  constructor({image, position, velocity, jumping, frames = { max: 1}}){
    this.position = position
    this.velocity = velocity
    this.jumping = jumping
    this.image = image
    this.frames = frames

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
      )
  }

  update() {
    this.draw();

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
    if (playerChar.position.y > ctx.canvas.height - 270) {
      playerChar.jumping = false;
      playerChar.position.y = ctx.canvas.height - 270;
      playerChar.velocity.y = 0;
    }
  }
}

class Boundary {
  static width = 32
  static height = 32
  constructor({position}) {
    this.position = position
    this.width = 32
    this.height = 32
  }

  draw() {
    ctx.fillStyle = 'red'
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
}