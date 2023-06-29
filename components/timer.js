class Timer {
   constructor() {
      this.gameTime = 336
      this.prevTime = null
      this.elem = createTextElem(this.gameTime, 'timer', '', 'h4')
   }
   update() {
      const currentTime = Date.now()
      if (currentTime - this.prevTime >= 1000) {
         this.prevTime = currentTime
         this.gameTime -= 1

         this.elem.textContent = this.gameTime
      }
   }
}