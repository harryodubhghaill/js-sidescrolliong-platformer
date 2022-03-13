class Sprite {
  constructor({image, position, velocity, jumping = false}){
    this.position.x = position.x
    this.position.y = position.y
    this.velocity.x = velocity.x
    this.velocity.y = velocity.y
    this.jumping = jumping
    this.image = image
  }

  draw() {
    ctx.drawImage(this.image, 0, 0)
  }
}