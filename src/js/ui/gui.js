import * as PIXI from 'pixi.js'
import Inventory from './inventory'
import MiniMap from './minimap'
import Console from "./console"

export default class GUI extends PIXI.Container {
  constructor(map, viewport) {
    super()
    this.map = map
    this.viewport = viewport

    this.crosshair = new PIXI.Container()
    const cp = new PIXI.Graphics()

    cp.lineStyle(1, 0xffffff)
    cp.beginFill(0xffffff)
    cp.moveTo(0, 0)
    cp.lineTo(11, 11)
    cp.moveTo(11, 0)
    cp.lineTo(0, 11)
    cp.endFill()

    this.crosshair.pivot.set(5, 5)

    this.crosshair.addChild(cp)
    this.addChild(this.crosshair)

    this.inventory = new Inventory(6)
    this.inventory.pivot.set(this.inventory.width, this.inventory.height)
    this.addChild(this.inventory)

    app.console = this.console = new Console()
    this.console.pivot.set(this.console.width, 0)
    this.console.position.set(app.screen.width, 0)
    this.addChild(this.console)

    this.on('added', parent => {
      console.info('GUI added')
      this.addElements()
      this.resize()
    })
  }

  addElements() {
    this.miniMap = new MiniMap(this.map, this.viewport)
    this.addChild(this.miniMap)
  }

  resize() {
    this.inventory.x = app.screen.width
    this.inventory.y = app.screen.height
    this.crosshair.position.set((app.renderer.width / 2) | 0, (app.renderer.height / 2) | 0)
  }

  update(time) {
    this.miniMap.update(time)
    this.console.update(time)
  }
}