import * as PIXI from 'pixi.js'
import GameObject from './game-object'
import {pointDirection} from '../utils/geometry'

export default class Ballistic extends GameObject {
  constructor(fromPosition, direction) {
    super()

    console.log('rocket')

    app.miniMapUpdate()
    app.sounds.rocket_launch.play()

    this.direction = direction
    this.speed = 0
    this.maxSpeed = 12
    this.lifeTime = 0
    this.lifeTimeMax = 4
    this.acceleration = 0.5
    this.position.copyFrom(fromPosition)

    this.g = new PIXI.Sprite(window.app.textures.small_rocket)
    this.g.anchor.set(0.5, 0.5)
    this.addChild(this.g)
  }

  update(time) {
    // console.log(`Rocket upd: ${this.speed}`)
    if (this.speed < this.maxSpeed) this.speed += this.acceleration * time
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
    console.log(`Rocket destroy`)
    super.destroy(options)
    app.miniMapUpdate()
  }
}