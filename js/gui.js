class GUI extends PIXI.Container {
  constructor(app) {
    super()

    const crosshair = new PIXI.Container()
    const cp = new PIXI.Graphics()

    cp.lineStyle(1, 0xffffff)
    cp.beginFill(0xffffff)
    cp.moveTo(0, 0)
    cp.lineTo(11, 11)
    cp.moveTo(11, 0)
    cp.lineTo(0, 11)
    cp.endFill()
    
    crosshair.pivot.set(5,5)
    crosshair.position.set((app.renderer.width / 2) | 0,(app.renderer.height / 2) | 0)

    crosshair.addChild(cp)
    this.addChild(crosshair)
    

    this.inventory = new Inventory(6)
    this.inventory.pivot.set(this.inventory.width / 2, this.inventory.height)
    this.addChild(this.inventory)
    this.resize()
  }

  resize() {
    this.inventory.x = app.screen.width / 2
    this.inventory.y = app.screen.height
  }
}