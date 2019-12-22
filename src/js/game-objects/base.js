import * as PIXI from 'pixi.js'
import GameObject from './game-object'

export default class Base extends GameObject {
  constructor() {
    super()
    this.graphics = new PIXI.Graphics()
    this.addChild(this.graphics)

    this.redraw()
    this.pivot.set(32, 32)
  }

  redraw() {
    this.graphics
      .lineStyle(1, this.selected ? 0xff0000 : 0, 1, 0)
      .beginFill(0x882222)
      .drawRect(0, 0, 64, 64)
      .endFill()
  }

  destroy(options) {
    delete this.graphics
    super.destroy(options)
  }
}