// explosion
class Particle {
   constructor({ position }) {
      this.elem = null
      this.position = { // position on screen
         x: position.x,
         y: position.y
      }
      createElem(this, 'particle', `translate(${this.position.x}px, ${this.position.y}px)`)
      const particlesSpritesheet = document.createElement("img")
      particlesSpritesheet.className = "particle_spritesheet"
      particlesSpritesheet.src = "https://mortalisgame.com/games/spaceinvaders/img/explosion_spritesheet.png"
      this.elem.appendChild(particlesSpritesheet)
      this.width = this.elem.clientWidth;
      this.height = this.elem.clientHeight;
      this.damage = 0
   }
   draw() {
      if (!this.elem) return
      this.elem.style.transform = `translate(${this.position.x}px, ${this.position.y + this.height / 2}px`
   }
   update() {
      this.draw()
   }
}

// Creates explosion particles for different objects
function createParticles({ object }) {
   explotionSound.play()
   game.particles.push(new Particle({
      position: object.position,
   }))
}

function renderParticles() {
   game.particles.forEach((particle, index) => {
      //if faded, remove from arr
      if (particle.opacity <= 0) {
         game.particles.slice(index, 1)
      } else {
         particle.update() // if not faded, update particle
      }
   })
}