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