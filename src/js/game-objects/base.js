import * as PIXI from 'pixi.js'
import GameObject from './game-object'

export default class Base extends GameObject {
  constructor() {
    super()


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
  }

  destroy(options) {
    delete this.graphics
    super.destroy(options)
  }
}