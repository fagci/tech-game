import * as PIXI from 'pixi.js'
import GameObject from './game-object'
import ProgressBar from '../ui/progressbar'
import Ballistic from './ballistic'

export default class Base extends GameObject {
  constructor() {
    super()

    this.maxLife = 5000
    this.life = 5000

    this.lifeIndicator = new ProgressBar(32, 4, this.maxLife, this.life)
    this.lifeIndicator.position.set(16, 16)

    const textureArray = [
      app.textures.base_1,
      app.textures.base_2,
      app.textures.base_3,
      app.textures.base_4,
    ]
    textureArray.forEach(t => {
      t.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
    })

    this.graphics = []
    for (let i = 0; i < 4; i++) {
      this.graphics[i] = new PIXI.AnimatedSprite(textureArray)
      this.graphics[i].play()
      this.graphics[i].animationSpeed = 0.1 * (i % 2 ? -1 : 1)
      this.addChild(this.graphics[i])
    }

    this.graphics[0].position.set(-12, -12)
    this.graphics[1].position.set(-12, 12)
    this.graphics[2].position.set(12, -12)
    this.graphics[3].position.set(12, 12)

    this.addChild(this.lifeIndicator)

    this.pivot.set(16, 16)

    this.on('added', world => {
      this.world = world
      this.globalHitArea = this.world.getLocalBounds()
    })
  }

  update() {
    if (this.life <= 0) {
      this.life = 0
      this.alpha -= 0.05
      if (this.alpha <= 0) this.destroy()
      return
    }
    this.world.children.forEach(gameObject => {
      if (gameObject instanceof Ballistic) {
        if (this.globalHitArea.contains(gameObject.position.x, gameObject.position.y)) {
          console.log(`Hit`)
          gameObject.hit()
          this.takeDamage(gameObject.DAMAGE)
        }
      }
    })
  }

  destroy(options) {
    app.miniMapUpdate()
    delete this.graphics
    // super.destroy() // TODO: destroy base couple with minimap entity
  }

  takeDamage(value) {
    this.life -= value
    this.lifeIndicator.setProgress(this.life)
  }
}