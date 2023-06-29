//Define player
class Player {
   constructor() {
      this.lives = {
         elem: null,
         count: 2,
      }
      this.lives.elem = createTextElem(`Lives: ${this.lives.count}`, "lives", "lives", "p");

      this.velocity = { //kuna player liigub, siis määrame kiiruse mõlemal teljel.
         x: 0,
         y: 0
      };

      this.rotation = 0;
      this.opacity = 1;


      this.startPos = {
         x: playground.bounds.width / 2,
         y: playground.bounds.height - 115,
      }
      this.position = {}
      this.invuln = false;
      this.setToStart()

      // DOM Element, needs to be after position
      createElem(this, 'player', `translate(${this.position.x}px, ${this.position.y}px)`)
      this.width = this.elem.clientWidth;
      this.height = this.elem.clientHeight;
   }

   setToStart() {
      this.position.x = this.startPos.x;
      this.position.y = this.startPos.y;
   }

   die() {
      deathSound.play();
      toggleBlink(this);
      setTimeout(() => toggleBlink(this), 2000)
      this.setToStart();
      this.velocity.x = 0;
      this.velocity.y = 0;

      this.lives.count--;
      this.lives.elem.textContent = `Lives: ${this.lives.count}`
   }

   draw() { // method to draw player on screen
      this.elem.style.transform = `translate(${this.position.x}px, ${this.position.y + this.height / 2}px`
   }

   update() { //method to move player
      this.draw()
      this.position.x += this.velocity.x
   }

}

function playerHit(invaderProjectile, index) {
   // Player was recently hit
   if (game.player.invuln) return;

   if (invaderProjectile.position.y + invaderProjectile.height >= game.player.position.y + (game.player.height / 2) &&
      invaderProjectile.position.x + invaderProjectile.width >= game.player.position.x &&
      invaderProjectile.position.x <= game.player.position.x + game.player.width) {
      // Check lives
      if (game.player.lives.count <= 0) {
         createParticles({
            object: game.player,
         })
         showStory = true
         storyCutscene(15)
         return true
      } else {
         createParticles({
            object: game.player,
         })
         game.player.die();
         removeInvProjectile(index);
      }
   }
}

function transformPlayer() {
   if (!game.player.elem) return
   if (game.keys.a.pressed && game.player.position.x >= 0) {
      game.player.velocity.x = -5
      game.player.elem.style.transform += ' rotate(-15deg)'
   } else if (game.keys.d.pressed && game.player.position.x + game.player.width <= width) {
      game.player.velocity.x = 5
      game.player.elem.style.transform += ' rotate(15deg)'
   } else {
      game.player.velocity.x = 0
   }
}

function toggleBlink(obj) {
   obj.invuln = !obj.invuln;
   obj.elem.classList.toggle("blink");
}
