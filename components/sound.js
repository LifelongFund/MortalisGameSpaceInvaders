class Sound {
   constructor(url) {
      this.sound = new Audio(url)
   }

   play() {
      if (this.sound.paused) {
         this.sound.play()
         return
      }
      this.restart()
   }

   pause() {
      this.sound.pause()
   }

   volume(value) {
      this.sound.volume = value
   }

   loop(value) {
      this.sound.loop = value
   }

   restart() {
      this.sound.currentTime = 0;
      this.sound.play()
   }
}

const deathSound = new Sound("https://mortalisgame.com/games/spaceinvaders/snd/death3.wav")
const explotionSound = new Sound("https://mortalisgame.com/games/spaceinvaders/snd/explosion1.wav")
const gameOverSound = new Sound("https://mortalisgame.com/games/spaceinvaders/snd/game_over4.wav")
const hitSound = new Sound("https://mortalisgame.com/games/spaceinvaders/snd/hit3.wav")
hitSound.volume(0.5)

const invaderLaserSound = new Sound("https://mortalisgame.com/games/spaceinvaders/snd/invadersLaser.wav")
invaderLaserSound.volume(0.5)

const playerLaserSound = new Sound("https://mortalisgame.com/games/spaceinvaders/snd/playerLaser.wav")
playerLaserSound.volume(0.5)

const backgroundSound = new Sound("https://mortalisgame.com/games/assets/background.mp3")
backgroundSound.loop(true)
backgroundSound.volume(0.50)

const presidentSound = new Sound("https://mortalisgame.com/games/spaceinvaders/snd/president.mp3")
presidentSound.loop(true)
presidentSound.volume(0.7)

const chairmanSound = new Sound("https://mortalisgame.com/games/spaceinvaders/snd/chairman.mp3")
chairmanSound.loop(true)
chairmanSound.volume(0.7)

const invaderSound = new Sound("https://mortalisgame.com/games/spaceinvaders/snd/invader.mp3")
invaderSound.loop(true)
invaderSound.volume(0.7)

function stopSounds() {
   const sounds = [presidentSound, chairmanSound, invaderSound];
   sounds.forEach(sound => sound.pause())
}