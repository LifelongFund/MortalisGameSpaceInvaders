// creating projectiles to shoot with
class Projectile {
   constructor({ position, velocity }) {
      this.elem = null
      this.position = position
      this.velocity = velocity
      this.radius = 4 //kuuli suurus
   }
   draw() { // method to draw projectile on screen
      if (!game.player.elem) return

      if (!this.elem) {
         const playerFromLeft = game.player.elem.offsetLeft;
         const playerFromTop = game.player.elem.offsetTop
         createElem(this, 'player-projectile', `translate(${playerFromLeft / 2}px, ${playerFromTop}px)`)
      }
      this.elem.style.transform = `translate(${this.position.x}px, ${this.position.y}px`
   }
   update() {
      this.draw()
      this.position.w += this.velocity.x
      this.position.y += this.velocity.y
   }
}

function createProjectile() {
   playerLaserSound.play()
   game.projectiles.push(new Projectile({
      position: {
         x: game.player.position.x + game.player.width / 2,
         y: game.player.position.y
      },
      velocity: {
         x: 0,
         y: -15
      }
   })
   )
}

function removeProjectile(index) {
   playground.elem.removeChild(game.projectiles[index].elem)
   // Splicing while there are other projectiles is fucking up the rest.
   game.projectiles.splice(index, 1)
}

function renderProjectiles() {
   game.projectiles.forEach((projectile, index) => {
      if (projectile.position.y + projectile.radius <= 0) {
         removeElem(projectile, index)
         game.projectiles.splice(index, 1)
      } else projectile.update()
      satelliteHit(projectile, index, 1)
   })
}