import * as PIXI from 'pixi.js'

export default class GameObject extends PIXI.Container {
  selected: boolean
  selectionGraphics: PIXI.Graphics

  constructor() {
    super()

    this.name = this.constructor.name
    this.selected = false

    this.interactive = true
    this.buttonMode = true

    this.selectionGraphics = new PIXI.Graphics()
    this.addChild(this.selectionGraphics)

    this.on('pointerdown', (e: any) => {
      if (e.data.button === 0) this.selected = !this.selected
      this.updateSelection()
    })

    this.on('added', () => {
      this.updateSelection()
    })
  }

  updateSelection() {
    this.selectionGraphics.clear()
    if (!this.selected) return
    const b = this.getLocalBounds()
    this.selectionGraphics
      .lineStyle(2, 0x00ff00, 0.75, 1)
      .beginFill(0x00ff00, 0.24)
      .drawRect(b.x, b.y, b.width, b.height)
      .endFill()
  }

  destroy(options: { children?: boolean; texture?: boolean; baseTexture?: boolean; }) {
    this.selectionGraphics.destroy()
    super.destroy(options)
  }
}