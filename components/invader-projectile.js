//creating invader projectiles to shoot back with
class InvaderProjectile {
   constructor({ position, velocity }) {
      this.index = null,
         this.elem = null,
         this.position = position
      this.velocity = velocity
      this.width = 8
      this.height = 8
   }
   draw() { // method to draw player on screen
      if (!this.elem) {
         createElem(this, 'invader-projectile', `translate(${this.position.x}px, ${this.position.y}px)`)
      }
      this.elem.style.transform = `translate(${this.position.x}px, ${this.position.y}px`
   }
   update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
   }
}

function removeInvProjectile(index) {
   if (!playground.elem.contains(game.invaderProjectiles[index].elem)) return

   playground.elem.removeChild(game.invaderProjectiles[index].elem)
   // Splicing while there are other projectiles is fucking up the rest.
   game.invaderProjectiles.splice(index, 1)
}

function renderInvaderProjectiles() {
   game.invaderProjectiles.forEach((invaderProjectile, index) => {
      if (invaderProjectile.position.y + invaderProjectile.height >= height) {
         if (invaderProjectile?.elem) {
            removeInvProjectile(index)
         }
      } else invaderProjectile.update()

      // check if player hit
      playerHit(invaderProjectile, index)
      // check if satellite hit
      satelliteHit(invaderProjectile, index)
   })
}

function createInvaderProjectile() {
   if (game.frames % game.laserSpeed === 0 && !!game.grid.activeInvaders.length) {
      //Selects random invader to shoot
      game.grid.activeInvaders[Math.floor(Math.random() * game.grid.activeInvaders.length)].shoot(game.invaderProjectiles)
   }
}