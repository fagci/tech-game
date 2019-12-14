import * as PIXI from 'pixi.js'

export default class GameObject extends PIXI.Graphics {
  constructor () {
    super()

    this.selected = false

    this.text = new PIXI.Text('', { fontSize: 8, fill: 0x00FF00 })
    this.addChild(this.text)

    this.on('added', function () {
      this.text.text = `${this.position.x | 0},${this.position.y | 0}`
      this.interactive = true
    })

    this.on('click', () => {
      this.selected = true
      this.redraw()
    })

    this.redraw()
  }

  redraw () {
    if (this.selected) {
      this.lineStyle(1, 0xff0000)
    } else {
      this.lineStyle(1, 0x1D313B)
    }

    this.beginFill(0x253B45)
    this.drawRect(0, 0, 32, 32)
    this.endFill()

  }
}