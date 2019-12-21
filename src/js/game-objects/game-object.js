import * as PIXI from 'pixi.js'

export default class GameObject extends PIXI.Container {
  constructor() {
    super()

    this.name = this.constructor.name
    this.selected = false

    this.interactive = true
    this.buttonMode = true

    this.selectionGraphics = new PIXI.Graphics()
    this.addChild(this.selectionGraphics)

    this.on('pointerdown', e => {
      if (e.data.button === 0) this.selected = !this.selected
      this.updateSelection()
    })

    this.on('added', parent => this.updateSelection())
  }

  updateSelection() {
    this.removeChild(this.selectionGraphics) // TODO: use pixi-layers to show selection atop of all objects
    this.selectionGraphics.clear()
    if (this.selected) {
      this.selectionGraphics.lineStyle(2, 0x00ff00, 0.75, 1)
      this.selectionGraphics.drawRect(0, 0, this.width, this.height)
    }
    this.addChild(this.selectionGraphics)
  }
}