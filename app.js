const width = 1024
const height = 576

//Main div
const playground = {
   elem: document.getElementById('playground'),
}
playground.elem.style.width = width
playground.elem.style.height = height
document.body.style.minWidth = `${width}px`
playground.bounds = playground.elem.getBoundingClientRect()

let game = null

window.focus()
languageMenu()

function startGame() {
   setupGame()
   cleanUpMenus()
   startAnimating(60)
}

function cleanUpGame() {
   const toClean = [
      game.player,
      game.grid,
      game.satellites,
      game.particles,
      game.projectiles,
      game.invaderProjectiles,
   ]

   if (playground.elem.contains(game.gameUi)) {
      playground.elem.removeChild(game.gameUi)
   }

   toClean.forEach(value => {
      if (Array.isArray(value)) {
         value.forEach(arrElem => {
            removeElem(arrElem)
         })
         if (value.length) {
            cleanUpSingleArr(value)
         }
         return
      }
      removeElem(value)
   })
}

function cleanUpMenus() {
   const menus = ['start-menu', 'pause-menu', 'end-menu', 'death-menu', 'storyscreen', 'languagescreen'];

   menus.forEach(menu => {
      if (menuElem = document.getElementById(menu)) {
         playground.elem.removeChild(menuElem)
      }
   })
}

// Based on https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
let fps, fpsInterval, startTime, now, then, elapsed;
function startAnimating(fps) {
   fpsInterval = 1000 / fps;
   then = window.performance.now();
   startTime = then;
   animate();
}

function animate() {
   if (game.timer.gameTime <= 0) {
      showStory = true
      storyCutscene(14)
      game.gameStates.over = true
      return
   }

   if (game.gameStates.over) return // if game is lost or won, stop animation
   if (game.gameStates.isRunning) window.requestAnimationFrame(animate)

   now = window.performance.now();
   elapsed = now - then;
   if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      window.main();
   }
}

window.main = function () { // animation loop
   game.player.update() // drawing player on screen
   game.timer.update() // updates timer 

   //Draws satellites on screen
   game.satellites.forEach((satellite) => satellite.update())

   renderInvaderProjectiles() //Renders invader projectiles on screen
   renderParticles() //Renders particles (explosions and stars) on screen when called

   game.grid.update()
   game.grid.getActiveInvaders()

   renderProjectiles() // rendering player projectiles on screen
   createInvaderProjectile()  //spawn a new invader projectil on screen with shoot method
   renderGrid()//detecting hit and removing projectiles and invaders

   // If grid reaches player, end game.
   if (game.grid.position.y >= game.player.position.y) {
      showStory = true
      backgroundSound.pause()
      gameOverSound.play()
      game.gameStates.over = true // global var to indicate that game is over
      game.gameStates.isRunning = false
      storyCutscene(15)
      return
   }

   //Check which key is pressed and cancel movement when required
   transformPlayer()

   if (game.keys.w.pressed) {
      createProjectile()
   }

   //Spawn invaders when grid is empty
   if (!game.grid.activeInvaders.length) {
      showStory = true
      const gameGrid = playground.elem.querySelector('#grid')
      gameGrid.style.display = "none"
      game.grid.resetGridPos()
      game.frames = 0 // default frames
      game.laserSpeed = defaultLaserSpeed
      if (showStory) {
         storyCutscene()
         return
      }
   }

   game.frames++ // add one loop of animation  
}

// move player
addEventListener("keydown", ({ key }) => {
   switch (key) {
      case "ArrowLeft":
         if (!game.gameStates.isRunning) return;
         game.keys.a.pressed = true
         break;
      case "ArrowRight":
         if (!game.gameStates.isRunning) return;
         game.keys.d.pressed = true
         break;
      case "Escape":
         if (game.gameStates.over) return;

         if (!game.gameStates.isPaused) {
            game.gameStates.isPaused = true
            game.gameStates.isRunning = false
            showPauseMenu()
            return
         }
         playground.elem.removeChild(playground.elem.querySelector('.pause-menu'))
         backgroundSound.play()
         game.gameStates.isPaused = false
         game.gameStates.isRunning = true
         window.requestAnimationFrame(animate)
         break;
      case "r":
         if (!showStory && dialogId === 1 || playground.elem.querySelector('.pause-menu')) {
            if (playground.elem.querySelector('.pause-menu')) restart = true
            showStory = true
            backgroundSound.play()
            storyCutscene(1)
            return
         }
         if (showStory) {
            if (dialogId === 2) {
               storyCutscene(2)
               return
            }
            showStory = false
            if (dialogId === 16) {
               dialogId = 1
               restart = true
               stopSounds()
               cleanUpMenus()
               showDeathMenu()
               return
            }
            if (dialogId === 15) {
               dialogId = 1
               restart = true
               stopSounds()
               cleanUpMenus()
               showEndMenu()
               return
            }
            if (!game) {
               stopSounds()
               startGame() // to start new game after story screens
            } else if (restart) { // to restart the game
               restart = false
               if (!game.gameStates.isPaused && !game.gameStates.over) return
               stopSounds()
               backgroundSound.restart()
               restartGame()
            } else { // to continue after story screen
               stopSounds()
               cleanUpMenus()
               const gameGrid = playground.elem.querySelector('#grid')
               gameGrid.style.removeProperty('display')
               game.gameStates.isPaused = false
               game.gameStates.isRunning = true
               window.requestAnimationFrame(animate)
            }
            return
         }
         break;
      case " ":
         if (!game.gameStates.isRunning) return;
         game.keys.space.pressed = true;
         break;
   }
})

addEventListener("keyup", ({ key }) => {
   switch (key) {
      case "ArrowLeft":
         game.keys.a.pressed = false
         break;
      case "ArrowRight":
         game.keys.d.pressed = false
         break;
      case " ":
         if (!game.gameStates.isRunning) return;
         createProjectile()
         game.keys.space.pressed = false
         break;
   }
})

addEventListener('resize', () => {
   playground.bounds = playground.elem.getBoundingClientRect();
});
