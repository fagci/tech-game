class GUI extends PIXI.Container {
  constructor () {
    super()
    this.inventory = new Inventory(6)
    this.inventory.pivot.set(this.inventory.width / 2, this.inventory.height)
    this.addChild(this.inventory)
    this.resize()
  }

  resize () {
    this.inventory.x = app.screen.width / 2
    this.inventory.y = app.screen.height
  }
}