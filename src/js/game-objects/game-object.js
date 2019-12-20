import * as PIXI from 'pixi.js'

export default class GameObject extends PIXI.Graphics {
  constructor () {
    super()

    // OBJ props
    this.selected = false

    this.interactive = true
    this.buttonMode = true

    this.on('pointerdown', e => {
      if (e.data.button === 0) this.selected = !this.selected
      this.redraw && this.redraw()
    })

    this.on('added', go => console.log('added',go))
  }
}