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
    this.frames = {...frames, val: 0, elapsed: 0}

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
    this.moving = false
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
      )

    // if (!this.moving) return

    if (this.frames.max > 1) {
      this.frames.elapsed++
    }

    if (this.frames.elapsed % 10 === 0) {
      if (this.frames.val < this.frames.max -1) {
        this.frames.val++
      } else {
        this.frames.val = 0
      }
    }
  }

  update() {

    this.draw();

    this.velocity.y += gravity; // gravity
    this.position.y += this.velocity.y;
    this.velocity.x *= 0.9; // friction

    for (let i = 0; i < boundaries.length; i++) {
      let boundary = boundaries[i];
      if (this.position.y + this.height <= boundary.position.y &&
          this.position.y + this.height + this.velocity.y >= boundary.position.y &&
          this.position.x + this.width >= boundary.position.x &&
          this.position.x <= boundary.position.x + boundary.width) {
        gravity = 0
        this.velocity.y = 0
        this.position.y = boundary.position.y - this.height + 12
        this.jumping = false
        console.log("here")
        break
      } 
    }

    if (controller.up && this.jumping == false) {
      gravity = 1.5
      this.velocity.y -= 20;
      this.jumping = true;
    }

    if (controller.left) {
      for (let i = 0; i < boundaries.length; i++) {
        let boundary = boundaries[i];
        if (this.position.y === boundary.position.y && this.position.x >= boundary.position.x) {
          this.velocity.x = 0
          // this.position.x = boundary.position.x
          console.log("Collision", this.position.x, boundary.position.x)
          break
        } else {
          playerChar.moving = true
          console.log("Move", this.position.x, boundary.position.x)
          this.velocity.x -= 0.5;
          this.position.x += this.velocity.x;
          break
          }
      } 
    }
    if (controller.right) {
      this.velocity.x += 0.5;
      this.position.x += this.velocity.x;
    }

    // boundaries.forEach((boundary) => {

    //   if (this.position.y + this.height <= boundary.position.y &&
    //     this.position.y + this.height + this.velocity.y >= boundary.position.y &&
    //     this.position.x + this.width >= boundary.position.x &&
    //     this.position.x <= boundary.position.x + boundary.width) {
    //     console.log("collision")
    //     gravity = 0
    //     this.velocity.y = 0
    //     this.position.y = boundary.position.y - 52
    //     this.jumping = false
    //   } 
    // })
    
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
    ctx.fillStyle = 'rgb(255, 0, 0, 0.2)'
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }
}