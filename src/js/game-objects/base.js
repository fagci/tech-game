import * as PIXI from 'pixi.js'
import GameObject from './game-object'
import ProgressBar from '../ui/progressbar'
import Ballistic from './ballistic'

export default class Base extends GameObject {
  constructor() {
    super()

    this.maxLife = 5000
    this.life = 1200

    this.lifeIndicator = new ProgressBar(32, 4, this.maxLife, this.life)
    this.lifeIndicator.pivot.set(17, 2)
    this.lifeIndicator.position.set(16, 16)

    let textureArray = [
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

    this.on('added', world => this.world = world)
    this.bounds = this.getLocalBounds()
    this.bounds.x = 4096 - 16
    this.bounds.y = 4096 - 16
    console.log(this.bounds)
  }

  update() {
    if (this.life <= 0) {
      this.life = 0
      this.alpha -= 0.05
      return
    }
    this.world.children.forEach(gameObject => {
      if (gameObject instanceof Ballistic) {
        if (this.bounds.contains(gameObject.position.x, gameObject.position.y)) {
          console.log(`Hit`)
          gameObject.hit()
          this.takeDamage(100)
        }
      }
    })
  }

  destroy(options) {
    delete this.graphics
    super.destroy(options)
  }

  takeDamage(value) {
    this.life -= value
    this.lifeIndicator.setProgress(this.life)
  }
}