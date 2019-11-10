class GameObject extends PIXI.Graphics {
  constructor() {
    super()

    this.lineStyle(1, 0x1D313B)
    this.beginFill(0x253B45)
    this.drawRect(0, 0, 32, 32)
    this.endFill()

    this.text = new PIXI.Text('', { fontSize: 8, fill: 0x00FF00 })
    this.addChild(this.text)

    this.text.text = `${this.position.x | 0},${this.position.y | 0}`
    console.log(this)
    this.interactive = true
    this.on('pointerover', this.filterOn)
      .on('pointerout', this.filterOff)
  }

  filterOn() {
    const outlineFilterRed = new PIXI.filters.GlowFilter(1, 0, 1, 0xff0000, 0.5);
    this.filters = [outlineFilterRed];
  }

  filterOff() {
    this.filters = null
  }
}
