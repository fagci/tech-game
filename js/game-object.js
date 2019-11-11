class GameObject extends PIXI.Graphics {
  constructor () {
    super()

    this.lineStyle(1, 0x1D313B)
    this.beginFill(0x253B45)
    this.drawRect(0, 0, 32, 32)
    this.endFill()

    this.pivot.set(0, 0)

    this.text = new PIXI.Text('', { fontSize: 8, fill: 0x00FF00 })
    this.addChild(this.text)

    this.on('added', function() {
      this.text.text = `${this.position.x | 0},${this.position.y | 0}`
    })
  }
}
