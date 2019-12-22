import * as PIXI from 'pixi.js'
import GameObject from './game-object'
import {pointDirection} from '../utils/geometry'

export class Drone extends GameObject {
  constructor() {
    super()

    this.phase = 0

    this.g = new PIXI.Sprite(window.app.textures.plane)
    this.g.anchor.set(0.5, 0.5)
    this.addChild(this.g)
  }

  update(time) {
    const r = 150
    this.phase += time * 0.02
    this.phase %= Math.PI * 2
    const x = Math.cos(this.phase) * r + 4096
    const y = Math.sin(this.phase) * r + 4096

    const oldPosition = new PIXI.Point()
    const newPosition = new PIXI.Point(x, y)

    this.position.copyTo(oldPosition)
    this.position.copyFrom(newPosition)

    this.rotation = pointDirection(oldPosition, newPosition) + Math.PI / 2
  }
}