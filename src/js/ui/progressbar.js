import * as PIXI from 'pixi.js'

export default class ProgressBar extends PIXI.Container {
  constructor(width, height, max, value) {
    super()
    this.w = width || 64
    this.h = height || 16
    this.max = max || 100
    this.value = value || 0

    this.bg = new PIXI.Graphics()
    this.fg = new PIXI.Graphics()

    this.addChild(this.bg)
    this.addChild(this.fg)

    this.bg
      .clear()
      .lineStyle(1, 0x000000, 1, 1)
      .beginFill(0x444444, 0.75)
      .drawRect(0, 0, this.w, this.h)
      .endFill()

    this.redrawProgress()
  }

  setProgress(value) {
    this.value = value
    this.redrawProgress()
  }

  redrawProgress() {
    this.fg
      .clear()
      .lineStyle(0, 0, 0, 0)
      .beginFill(0x00ff00)
      .drawRect(0, 0, (this.width * this.value / this.max) | 0, this.h)
  }

}