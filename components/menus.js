function languageMenu() {
   const buttonElemEst = document.createElement('button')
   buttonElemEst.className = "button buttonEst"
   buttonElemEst.type = "button"
   buttonElemEst.setAttribute("onclick", "selectLanguage('est')")
   const startCol1Elements = [
      createTextElem('Vali keel', 'start-text', 'game-text', 'h3'),
      buttonElemEst
   ]
   const buttonElemEng = document.createElement('button')
   buttonElemEng.className = "button buttonEng"
   buttonElemEng.type = "button"
   buttonElemEng.setAttribute("onclick", "selectLanguage('eng')")
   const startCol2Elements = [
      createTextElem('Choose langauge', 'start-text', 'game-text', 'h3'),
      buttonElemEng
   ]
   const storyCol1 = document.createElement('div')
   storyCol1.id = "langEST"
   const storyCol2 = document.createElement('div')
   storyCol2.id = "langENG"

   startCol1Elements.forEach(elem => {
      storyCol1.appendChild(elem)
   })
   startCol2Elements.forEach(elem => {
      storyCol2.appendChild(elem)
   })
   createMenuScreen('languagescreen', [storyCol1, storyCol2])
}

function showStartMenu() {
   let startCol1Elements = []
   let startCol2Elements = []
   switch (language) {
      case "eng":
         startCol1Elements = [
            createTextElem('Space Invaders', 'start-title', 'game-title', 'h1'),
            createTextElem('Ver 1.5', 'start-text', 'game-text', 'h4'),
            createTextElem('To win this game, you need to stay alive until the timer runs up, or kill 12 groups of invaders.', 'start-text', 'game-text', 'h3'),
            createTextElem('Do not let the invaders reach your position or you lose!', 'start-text', 'game-text', 'h3'),
            createTextElem('Coding: Urmas Rist, Karel Vendla, Mihkel Leesment', 'start-text', 'credits-start-text', 'p'),
            createTextElem('Story: Maniakkide Tänav', 'start-text', 'credits-text', 'p'),
            createTextElem('Art: Mark Puhkan', 'start-text', 'credits-text', 'p'),
            createTextElem('Music: Henri Viies', 'start-text', 'credits-text', 'p'),
            createTextElem('Sounds: Kristjan Kiis', 'start-text', 'credits-text', 'p'),
            createTextElem('Translation: Martin Kirotar', 'start-text', 'credits-text', 'p')
         ]

         startCol2Elements = [
            createTextElem('Press R to start', 'start-text', 'game-text', 'h3'),
            createTextElem('Arrow left = left', 'start-text', 'game-text', 'h3'),
            createTextElem('Arrow right = right', 'start-text', 'game-text', 'h3'),
            createTextElem(`Spacebar = shoot`, 'start-text', 'game-text', 'h3'),
            createTextElem(`Esc = pause`, 'start-text', 'game-text', 'h3')
         ]
         break;
      case "est":
         startCol1Elements = [
            createTextElem('Space Invaders', 'start-title', 'game-title', 'h1'),
            createTextElem('Ver 1.5', 'start-text', 'game-text', 'h4'),
            createTextElem('Mängu võitmiseks on vaja püsida elus kuni taimer jõuab nulli, või tappa kõik 12 tulnukate lainet.', 'start-text', 'game-text', 'h3'),
            createTextElem('Ära lase tulnukatel jõuda oma positsioonini, muidu sured!', 'start-text', 'game-text', 'h3'),
            createTextElem('Programmeerijad: Urmas Rist, Karel Vendla, Mihkel Leesment', 'start-text', 'credits-start-text', 'p'),
            createTextElem('Lugu: Maniakkide Tänav', 'start-text', 'credits-text', 'p'),
            createTextElem('Kunst: Mark Puhkan', 'start-text', 'credits-text', 'p'),
            createTextElem('Muusika: Henri Viies', 'start-text', 'credits-text', 'p'),
            createTextElem('Hääled: Kristjan Kiis', 'start-text', 'credits-text', 'p'),
            createTextElem('Tõlge: Martin Kirotar', 'start-text', 'credits-text', 'p')
         ]
         startCol2Elements = [
            createTextElem('Klahv R alustab', 'start-text', 'game-text', 'h3'),
            createTextElem('Nool vasakule = vasakule', 'start-text', 'game-text', 'h3'),
            createTextElem('Nool paremale  = paremale', 'start-text', 'game-text', 'h3'),
            createTextElem(`Tühikuklahv = tuld!`, 'start-text', 'game-text', 'h3'),
            createTextElem(`Esc = paus`, 'start-text', 'game-text', 'h3')
         ]
         break;
   }

   const storyCol1 = document.createElement('div')
   storyCol1.id = "storyCol1"
   const storyCol2 = document.createElement('div')
   storyCol2.id = "storyCol2"

   storyCol1.classList.add("widecol")
   storyCol2.classList.add("narrowcol")
   startCol1Elements.forEach(elem => {
      storyCol1.appendChild(elem)
   })
   startCol2Elements.forEach(elem => {
      storyCol2.appendChild(elem)
   })
   createMenuScreen('storyscreen', [storyCol1, storyCol2])
}

function showEndMenu() {
   let startCol1Elements = []
   let startCol2Elements = []
   backgroundSound.pause()
   gameOverSound.play()
   game.gameStates.over = true // global var to indicate that game is over
   game.gameStates.isRunning = false
   switch (language) {
      case "est":
         startCol1Elements = [
            createTextElem('Õnnitlused! Sa päästsid Maa!', 'end-title', 'game-title', 'h1'),
         ]
         startCol2Elements = [
            createTextElem(`Skoor: ${game.score.count}`, 'end-text', 'game-text', 'h3'),
            createTextElem('Vajuta R või värskenda veebilehitsejat (F5), et mängida uuesti', 'end-text', 'game-text', 'h3')
         ]
         break;
      default:
         startCol1Elements = [
            createTextElem('Congrats! You saved the Earth!', 'end-title', 'game-title', 'h1'),
         ]
         startCol2Elements = [
            createTextElem(`Your score: ${game.score.count}`, 'end-text', 'game-text', 'h3'),
            createTextElem('Press R to restart, or refresh browser (F5) to start from beginning', 'end-text', 'game-text', 'h3')
         ]
         break;
   }

   const storyCol1 = document.createElement('div')
   storyCol1.id = "storyCol1"
   const storyCol2 = document.createElement('div')
   storyCol2.id = "storyCol2"

   storyCol1.classList.add("widecol")
   storyCol2.classList.add("narrowcol")
   startCol1Elements.forEach(elem => {
      storyCol1.appendChild(elem)
   })
   startCol2Elements.forEach(elem => {
      storyCol2.appendChild(elem)
   })
   createMenuScreen('storyscreen', [storyCol1, storyCol2])
   cleanUpGame()
}

function showDeathMenu() {
   let startCol1Elements = []
   let startCol2Elements = []
   switch (language) {
      case "est":
         startCol1Elements = [
            createTextElem('Mäng läbi!', 'end-title', 'game-title', 'h1')
         ]
         startCol2Elements = [
            createTextElem(`Skoor: ${game.score.count}`, 'end-text', 'game-text', 'h3'),
            createTextElem('Vajuta R või värskenda veebilehitsejat (F5), et mängida uuesti', 'end-text', 'game-text', 'h3')
         ]
         break;

      case "eng":
         startCol1Elements = [
            createTextElem('Game Over!', 'end-title', 'game-title', 'h1')
         ]
         startCol2Elements = [
            createTextElem(`Your score: ${game.score.count}`, 'end-text', 'game-text', 'h3'),
            createTextElem('Press R to restart, or refresh browser (F5) to start from beginning', 'end-text', 'game-text', 'h3')
         ]
         break;
   }

   const storyCol1 = document.createElement('div')
   storyCol1.id = "storyCol1"
   const storyCol2 = document.createElement('div')
   storyCol2.id = "storyCol2"

   storyCol1.classList.add("widecol")
   storyCol2.classList.add("narrowcol")
   startCol1Elements.forEach(elem => {
      storyCol1.appendChild(elem)
   })
   startCol2Elements.forEach(elem => {
      storyCol2.appendChild(elem)
   })
   createMenuScreen('storyscreen', [storyCol1, storyCol2])
   cleanUpGame()
}

function showPauseMenu() {
   let startCol1Elements = []
   let startCol2Elements = []
   backgroundSound.pause()
   switch (language) {
      case "est":
         startCol1Elements = [
            createTextElem('Mäng pausil', 'pause-title', 'game-title', 'h1'),
            createTextElem(`Skoor: ${game.score.count}`, 'end-text', 'game-text', 'h3'),
            createTextElem('Vajuta ESCAPE, et jätkata', 'pause-text', 'game-text', 'h3')
         ]
         startCol2Elements = [
            createTextElem('Klahv R taasalustab', 'pause-text', 'game-text', 'h3'),
            createTextElem('Nool vasakule = vasakule', 'pause-text', 'game-text', 'h3'),
            createTextElem('Nool paremale  = paremale', 'pause-text', 'game-text', 'h3'),
            createTextElem(`Tühikuklahv = tuld!`, 'pause-text', 'game-text', 'h3'),
            createTextElem(`Esc = jätka`, 'pause-text', 'game-text', 'h3')
         ]
         break;
      case "eng":
         startCol1Elements = [
            createTextElem('Game Paused', 'pause-title', 'game-title', 'h1'),
            createTextElem(`Your score: ${game.score.count}`, 'end-text', 'game-text', 'h3'),
            createTextElem('Press ESCAPE to continue', 'pause-text', 'game-text', 'h3')
         ]
         startCol2Elements = [
            createTextElem('Press r to restart', 'pause-text', 'game-text', 'h3'),
            createTextElem('Arrow left = left', 'pause-text', 'game-text', 'h3'),
            createTextElem('Arrow right = right', 'pause-text', 'game-text', 'h3'),
            createTextElem(`Spacebar = shoot`, 'pause-text', 'game-text', 'h3'),
            createTextElem(`Esc = pause/unpuse`, 'pause-text', 'game-text', 'h3')
         ]
         break;
   }
   const storyCol1 = document.createElement('div')
   storyCol1.id = "storyCol1"
   const storyCol2 = document.createElement('div')
   storyCol2.id = "storyCol2"

   storyCol1.classList.add("widecol")
   storyCol2.classList.add("narrowcol")
   startCol1Elements.forEach(elem => {
      storyCol1.appendChild(elem)
   })
   startCol2Elements.forEach(elem => {
      storyCol2.appendChild(elem)
   })
   const pauseMenu = createMenuScreen('storyscreen', [storyCol1, storyCol2])
   pauseMenu.classList.add("pause-menu")
}