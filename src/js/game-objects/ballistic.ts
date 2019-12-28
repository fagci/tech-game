import * as PIXI from 'pixi.js'
import GameObject from './game-object'
import {pointDirection} from '../utils/geometry'

export default class Ballistic extends GameObject {
  DAMAGE: number
  MAX_SPEED: number
  direction: number
  speed: number
  lifeTime: number
  lifeTimeMax: number
  acceleration: number
  sprite: PIXI.Sprite

  constructor(fromPosition: PIXI.IPoint, direction: number) {
    super()

    this.DAMAGE = 1200
    this.MAX_SPEED = 12

    window.app.miniMapUpdate() // TODO: update minimap globally on item added to entity map
    // window.app.sounds.rocket_launch.play()

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

  update(dt: number) {
    if (this.speed < this.MAX_SPEED) this.speed += this.acceleration * dt
    const x = this.position.x + Math.cos(this.direction) * this.speed
    const y = this.position.y + Math.sin(this.direction) * this.speed
    const oldPosition = new PIXI.Point()
    const newPosition = new PIXI.Point(x, y)

    this.position.copyTo(oldPosition)
    this.position.copyFrom(newPosition)

    this.rotation = pointDirection(oldPosition, newPosition) + Math.PI / 2

    if (this.lifeTime >= this.lifeTimeMax) {
      this.destroy({})
    }
    this.lifeTime += window.app.ticker.elapsedMS / 1000.0
  }

  hit() {
    this.destroy({})
  }

  destroy(options: { children?: boolean; texture?: boolean; baseTexture?: boolean; }) {
    this.sprite.destroy()
    super.destroy(options)
    window.app.miniMapUpdate()
  }
}