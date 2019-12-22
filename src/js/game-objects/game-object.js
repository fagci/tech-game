import * as PIXI from 'pixi.js'

export default class GameObject extends PIXI.Container {
  constructor(name) {
    super()

    this.name = name || this.constructor.name
    this.selected = false

    this.interactive = true
    this.buttonMode = true

    this.selectionGraphics = new PIXI.Graphics()


    this.on('pointerdown', e => {
      if (e.data.button === 0) this.selected = !this.selected
      this.updateSelection()
    })

    this.on('added', () => {
      this.addChild(this.selectionGraphics) // TODO: use pixi-layers to show selection atop of all objects
      this.updateSelection()
    })
  }

  updateSelection() {
    this.selectionGraphics.clear()
    if (!this.selected) return
    this.selectionGraphics
      .lineStyle(2, 0x00ff00, 0.75, 1)
      .drawRect(0, 0, this.width, this.height)
  }

  destroy(options) {
    this.selectionGraphics.destroy()
    super.destroy(options)
  }
}