class Grid {
   constructor() {
      this.elem = null
      createElem(this, 'grid', null, false)

      this.invaders = []
      this.activeInvaders = []
      this.columns = randNbr(8, 12)
      this.rows = randNbr(5, 10)
      this.difficultyPercent = 0.2
      this.width = this.columns * 30
      this.height = 0

      this.position = {
         x: width / 2 - ((this.width) / 2), // set init grid pos. middle of screen
         y: 0
      }
      this.velocity = {
         x: this.getRandXVelocity(), // speed of movement (random ,left or right)
         y: 0
      }

      this.map = makeMap(this.columns, this.rows, this.difficultyPercent)
      this.rampUpDifficulty()

      for (let x = 0; x < this.map.length; x++) {
         const row = document.createElement('div')
         row.className = 'invader-row'

         for (let y = 0; y < this.map[x].length; y++) {
            const invader = new Invader({
               index: this.invaders.length,
               position: {
                  x: (y * 30) + this.position.x,
                  y: (x * 30) + this.position.y,
               }
            })

            // Is invader shown or not.
            if (this.map[x][y] === 0) {
               invader.elem.style.backgroundImage = 'none'
               invader.active = false
            }

            this.invaders.push(invader)
            row.appendChild(invader.elem)
         }
         this.elem.appendChild(row)
      }

      this.elem.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
      playground.elem.appendChild(this.elem)

      this.height = this.elem.clientHeight
   }
   rampUpDifficulty() {
      if (this.difficultyPercent < 1) {
         this.difficultyPercent =
            Math.round((this.difficultyPercent + 0.1) * 10) / 10
      }
   }
   resetGridPos() {
      this.rampUpDifficulty()

      this.position = { x: width / 2 - ((this.width) / 2), y: 0 }
      this.velocity = { x: this.getRandXVelocity(), y: 0 }

      this.map = makeMap(this.columns, this.rows, this.difficultyPercent)
      let x = 0
      let y = 0
      for (let i = 0; i < this.invaders.length; i++) {
         const invader = this.invaders[i];

         invader.position = {
            x: (y * 30) + this.position.x,
            y: (x * 30) + this.position.y,
         }

         // Is invader shown or not. (all invaders are currently unactive)
         if (this.map[x][y] === 1) {
            invader.elem.removeAttribute('style');
            invader.active = true
         }

         if (y < this.columns - 1) {
            y++
         } else {
            y = 0
            x++
         }
      }
   }

   update() {
      if (!this.activeInvaders.length || !this.elem) return

      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      this.velocity.y = 0 // reset y to stop moving down
      this.elem.style.transform = `translate(${this.position.x}px, ${this.position.y}px`

      // if edge of screen, change direction
      const edges = this.getEdgeMostGridValues()

      if (0 >= edges[0] || width <= edges[1]) {
         this.velocity.x = -this.velocity.x
         this.velocity.y = 30 // move down 1 frame (height of an invader)
      }

      this.invaders.forEach(inv => {
         inv.position.x += this.velocity.x;
         inv.position.y += this.velocity.y;
      })
   }
   getActiveInvaders() {
      this.activeInvaders = this.invaders.filter(invader => invader.active !== false)
   }
   getEdgeMostGridValues() {
      const edgeValues = [
         this.activeInvaders[0].position.x, // left
         this.activeInvaders[this.activeInvaders.length - 1].getXFromRight() // right
      ]
      this.activeInvaders.forEach(invader => {
         if (invader.position.x <= edgeValues[0]) {
            edgeValues[0] = invader.position.x
         }

         if (invader.getXFromRight() >= edgeValues[1]) {
            edgeValues[1] = invader.getXFromRight()
         }
      })

      return edgeValues
   }
   getRandXVelocity() {
      const randVal = !!randNbr(0, 1)
      const stages = [
         {
            difficulty: 0.3,
            value: randVal ? 1 : -1,
         },
         {
            difficulty: 0.5,
            value: randVal ? 2 : -2,
         },
         {
            difficulty: 0.7,
            value: randVal ? 3 : -3,
         },

         {
            difficulty: 1,
            value: randVal ? 4 : -4,
         },
      ]

      for (let i = 0; i < stages.length; i++) {
         const stage = stages[i];

         if (this.difficultyPercent <= stages[i].difficulty) {
            return stage.value
         }
      }
   }
}

function renderGrid() {
   for (let i = 0; i < game.grid.activeInvaders.length; i++) {
      const invader = game.grid.activeInvaders[i]
      for (let j = 0; j < game.projectiles.length; j++) {
         const projectile = game.projectiles[j]

         if (projectile.position.y - projectile.radius <= invader.position.y + invader.height &&
            projectile.position.x + projectile.radius >= invader.position.x &&
            projectile.position.x - projectile.radius <= invader.position.x + invader.width &&
            projectile.position.y + projectile.radius >= invader.position.y) {
            hitSound.play()

            game.score.count += 10
            game.score.elem.textContent = `Score: ${game.score.count}`

            // speedup invader lasers
            game.laserSpeed -= 0.5;
            //Make invaders move faster
            const speedChange = 0.05

            //Before changing speed, check direction
            game.grid.velocity.x += game.grid.velocity.x < 0 ? -1 * speedChange : speedChange

            if (invader.elem) {
               invader.elem.style.backgroundImage = 'none'
               invader.active = false;
            }

            //remove the projectile that hit invader
            if (projectile.elem) {
               playground.elem.removeChild(projectile.elem)
               projectile.elem = null
            }
            game.projectiles.splice(j, 1)
         }
      }
   }
}