import * as PIXI from 'pixi.js'
import GameObject from './game-object'
import {pointDirection} from '../utils/geometry'

export default class Ballistic extends GameObject {
  constructor(fromPosition, direction) {
    super()

    this.DAMAGE = 1200
    this.MAX_SPEED = 12

    app.miniMapUpdate() // TODO: update minimap globally on item added to entity map
    app.sounds.rocket_launch.play()

    this.direction = direction + (Math.random() - 0.5) * 0.4
    this.speed = 0
    this.lifeTime = 0
    this.lifeTimeMax = 4
    this.acceleration = 0.5
    this.position.copyFrom(fromPosition)

    this.sprite = new PIXI.Sprite(window.app.textures.small_rocket)
    this.sprite.anchor.set(0.5, 0.5)
    this.addChild(this.sprite)
  }

  update(time) {
    if (this.speed < this.MAX_SPEED) this.speed += this.acceleration * time
    const x = this.position.x + Math.cos(this.direction) * this.speed
    const y = this.position.y + Math.sin(this.direction) * this.speed
    const oldPosition = new PIXI.Point()
    const newPosition = new PIXI.Point(x, y)

    this.position.copyTo(oldPosition)
    this.position.copyFrom(newPosition)

    this.rotation = pointDirection(oldPosition, newPosition) + Math.PI / 2

    if (this.lifeTime >= this.lifeTimeMax) {
      this.destroy()
    }
    this.lifeTime += app.ticker.elapsedMS / 1000.0
  }

  hit() {
    this.destroy()
  }

  destroy(options) {
    this.sprite.destroy()
    super.destroy(options)
    app.miniMapUpdate()
  }
}