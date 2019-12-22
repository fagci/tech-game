import * as PIXI from 'pixi.js'
import GameObject from './game-object'

export default class Base extends GameObject {
  constructor() {
    super()
    this.g = new PIXI.Graphics()
    this.addChild(this.g)

    this.redraw()
    this.pivot.set(32, 32)
  }

  redraw() {
    this.g.lineStyle(1, this.selected ? 0xff0000 : 0, 1, 0)
    this.g.beginFill(0x882222)
    this.g.drawRect(0, 0, 64, 64)
    this.g.endFill()
  }
}