// creating invader class
class Invader {
   constructor({ index, position }) {
      this.elem = null
      createElem(this, 'invader', null)

      this.position = {
         x: position.x,
         y: position.y,
      }
      this.index = index
      this.height = this.elem.clientHeight
      this.width = this.elem.clientWidth
      this.active = true;
   }
   shoot(invaderProjectiles) {
      invaderLaserSound.play()

      invaderProjectiles.push(new InvaderProjectile({
         index: invaderProjectiles.length,
         position: {
            x: this.position.x + this.width / 2, //to get center of the invader
            y: this.position.y + this.height //to get bottom
         },
         velocity: {
            x: 0,
            y: 2  // 2 px per second
         }
      }))
   }
   getXFromRight() {
      return this.position.x + this.width
   }
}