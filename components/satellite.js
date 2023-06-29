// define satellite class
class Satellite {
    constructor({ position }) {
        this.elem = null
        this.position = { // position on screen
            x: position.x,
            y: position.y
        }
        createElem(this, 'satellite', `translate(${this.position.x}px, ${this.position.y}px)`)
        this.width = this.elem.clientWidth;
        this.height = this.elem.clientHeight;
        this.damage = 0
    }
    // creates satellite element on playground
    draw() {
        if (!this.elem) return
        this.elem.style.transform = `translate(${this.position.x}px, ${this.position.y + this.height / 2}px`
    }
    //updates satellite position.
    update() {
        this.draw()
    }
}

function satelliteHit(projectile, index, type) {
    for (let i = 0; i < game.satellites.length; i++) {
        const satellite = game.satellites[i];
        if (satellite.damage >= 5) continue
        switch (type) {
            case 1: // hit by player from below
                if (projectile.position.y - projectile.radius <= satellite.position.y + satellite.height &&
                    projectile.position.x + projectile.radius >= satellite.position.x &&
                    projectile.position.x - projectile.radius <= satellite.position.x + satellite.width &&
                    projectile.position.y + projectile.radius >= satellite.position.y) {
                    satellite.damage++ //register hit
                    hitSound.play()
                    removeProjectile(index);
                    try { satellite.elem.classList.remove("pos" + (satellite.damage - 1)) } // remove previous class if exists
                    catch (error) {
                        console.error(error);
                    }

                    if (satellite.damage < 5) { // change sprite sheet of sattelite
                        satellite.elem.classList.add("pos" + satellite.damage)
                    } else if (satellite.damage >= 5) { // make explosion (particle)
                        try { satellite.elem.classList.remove("satellite") } catch (error) {
                            console.error(error);
                        }
                        createParticles({
                            object: satellite
                        })
                        removeElem(satellite)
                        game.satellites.slice(i, 1)
                    }
                }
                break;
            default: // hit by invader from above
                if (!satellite.elem) continue

                if (projectile.position.y + projectile.height >= satellite.position.y + (satellite.height / 2) &&
                    projectile.position.x + projectile.width >= satellite.position.x &&
                    projectile.position.x <= satellite.position.x + satellite.width) {
                    satellite.damage++ //register hit
                    hitSound.play()
                    removeInvProjectile(index);

                    satellite.elem.classList.remove("pos" + (satellite.damage - 1)) // remove previous class if exists

                    // make explosion (particle)
                    if (satellite.damage < 5) {
                        satellite.elem.classList.add("pos" + satellite.damage)
                    } else if (satellite.damage >= 5) {
                        satellite.elem.classList.remove("satellite")
                        createParticles({
                            object: satellite
                        })
                        removeElem(satellite)
                        game.satellites.slice(i, 1)
                    }
                }
                break;
        }
    }
}
