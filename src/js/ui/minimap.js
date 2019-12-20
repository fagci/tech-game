import * as PIXI from 'pixi.js'

export default class MiniMap extends PIXI.Container {
  constructor (map) {
    super()

    const bg = new PIXI.Graphics()
    bg.lineStyle(1, 0xffffff, 1, 0)
    bg.beginFill(0x000000)
    bg.drawRect(0, 0, 200, 200)
    bg.endFill()

    this.addChild(bg)
  }
}