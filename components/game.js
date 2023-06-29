const defaultLaserSpeed = 100
class Game {
    constructor() {
        this.laserSpeed = defaultLaserSpeed
        this.score = {
            count: 0,
            elem: createTextElem(`Score: ${0}`, "score", "score", "p")
        }
        this.frames = 0
        this.gameStates = {
            over: false,
            isRunning: true,
            isPaused: false
        }
        this.timer = new Timer() // create new timer
        this.player = new Player() // create new player
        this.projectiles = []
        this.grid = new Grid()
        this.invaderProjectiles = []
        this.particles = []
        this.satellites = []
        this.keys = {
            a: { pressed: false },
            d: { pressed: false },
            space: { pressed: false },
            w: { pressed: false }
        }
        this.gameUi = this.createGameUI()
    }
    setup() {
    }
    static get defaultLaserSpeed() {
        return defaultLaserSpeed;
    }
    createGameUI() {
        const gameUi = document.createElement('div')
        gameUi.className = 'game-ui'

        gameUi.appendChild(this.timer.elem)
        gameUi.appendChild(this.player.lives.elem)
        gameUi.appendChild(this.score.elem)

        playground.elem.appendChild(gameUi)

        return gameUi
    }
}

function setupGame() {
    game = new Game()

    for (let i = 55; i <= width - 55; i += 200) {
        game.satellites.push(new Satellite({ position: { x: i, y: 325 } }))
    }
}

function restartGame() {
    cleanUpGame()
    cleanUpMenus()

    setupGame()
    window.requestAnimationFrame(animate)
}