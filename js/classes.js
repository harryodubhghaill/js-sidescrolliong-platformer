class Sprite {
  constructor({image, position, velocity, jumping}){
    this.position = position
    this.velocity = velocity
    this.jumping = jumping
    this.image = image
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y)
  }
}