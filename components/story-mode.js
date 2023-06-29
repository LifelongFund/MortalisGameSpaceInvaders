let dialogId = 1
let showStory = false
let restart = false
let language = ""

function storyCutscene(dialog) {
   cleanUpMenus()
   if (game && !game.gameStates.isPaused) {
      game.gameStates.isPaused = true
      game.gameStates.isRunning = false
   }

   if (dialog) {
      dialogId = dialog
   }

   if (language === "est") {
      storyTexts = storyTextsEST
   } else storyTexts = storyTextsENG

   const storyCol1 = document.createElement('div')
   storyCol1.id = "storyCol1"

   const storyCol2 = document.createElement('div')
   storyCol2.id = "storyCol2"

   switch (dialogId) { //switch picture position left and right depending on story dialogID
      case 3:
      case 5:
      case 7:
      case 9:
      case 11:
      case 13: //picture to the left for chairman
         storyCol1.classList.add("narrowcol", "chairman")
         storyCol2.classList.add("widecol")
         storyTexts[dialogId].forEach(elem => {
            storyCol2.appendChild(elem)
         })
         createMenuScreen('storyscreen', [storyCol1, storyCol2])
         animateDialogPicture(storyCol1, "url('https://mortalisgame.com/games/spaceinvaders/img/esimees_sprite.png')")
         chairmanSound.play()
         break;
      case 1:
         storyCol1.classList.add("widecol")
         storyCol2.classList.add("narrowcol", "commander")
         storyTexts[dialogId].forEach(elem => {
            storyCol1.appendChild(elem)
         })
         storyCol2.style.backgroundImage = "url('https://mortalisgame.com/games/spaceinvaders/img/commander.png')"
         createMenuScreen('storyscreen', [storyCol1, storyCol2])
         break
      case 2:
      case 4:
      case 6:
      case 8:
      case 10:
      case 12:
      case 14: //picture to the right for president
         storyCol1.classList.add("widecol")
         storyCol2.classList.add("narrowcol", "president")
         storyTexts[dialogId].forEach(elem => {
            storyCol1.appendChild(elem)
         })
         createMenuScreen('storyscreen', [storyCol1, storyCol2])
         animateDialogPicture(storyCol2, "url('https://mortalisgame.com/games/spaceinvaders/img/president_sprite.png')")
         presidentSound.play()
         break;
      case 15: //invader spritesheet
         storyCol1.classList.add("widecol")
         storyCol2.classList.add("invadersprite", "narrowcol")
         storyTexts[dialogId].forEach(elem => {
            storyCol1.appendChild(elem)
         })
         createMenuScreen('storyscreen', [storyCol1, storyCol2])
         animateDialogPicture(storyCol2, "url('https://mortalisgame.com/games/spaceinvaders/img/invader_sprite.png')")
         invaderSound.play()
         break
   }
   dialogId++
}

function animateDialogPicture(storycol, imgSrc) {
   const dialogSpritesheet = document.createElement("div")
   dialogSpritesheet.className = "dialogspritesheet"
   dialogSpritesheet.style.backgroundImage = imgSrc
   if (imgSrc === "url('https://mortalisgame.com/games/spaceinvaders/img/invader_sprite.png')") {
      dialogSpritesheet.style.animation = "talk2 0.5s steps(2) infinite"
   }
   storycol.appendChild(dialogSpritesheet)
}