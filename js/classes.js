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

let gravity = 1.5;
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

    this.velocity.y += gravity; // gravity
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    this.velocity.x *= 0.9; // friction

    if (controller.up && this.jumping == false) {
      this.velocity.y -= 20;
      this.jumping = true;
    }
    if (controller.left) {
      this.velocity.x -= 0.5;
      this.position.x += this.velocity.x;
    }
    if (controller.right) {
      this.velocity.x += 0.5;
      this.position.x += this.velocity.x;
    }

    boundaries.forEach((boundary) => {

      if (this.position.y + this.height <= boundary.position.y &&
        this.position.y + this.height + this.velocity.y >= boundary.position.y &&
        this.position.x + this.width >= boundary.position.x &&
        this.position.x <= boundary.position.x + boundary.width) {
        console.log("collision")
        gravity = 0
        this.velocity.y = 0
        this.position.y = boundary.position.y - 52
      } 
    })
    
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