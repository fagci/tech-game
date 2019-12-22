import * as PIXI from 'pixi.js'
import Inventory from './inventory'
import MiniMap from './minimap'
import Console from './console'

export default class GUI extends PIXI.Container {
  constructor(map, viewport) {
    super()
    this.map = map
    this.viewport = viewport

    this.crosshair = new PIXI.Container()
    const crossGraphics = new PIXI.Graphics()

    crossGraphics
      .lineStyle(1, 0xffffff)
      .beginFill(0xffffff)
      .moveTo(0, 0)
      .lineTo(11, 11)
      .moveTo(11, 0)
      .lineTo(0, 11)
      .endFill()

    this.crosshair.pivot.set(5, 5)

    this.crosshair.addChild(crossGraphics)
    this.addChild(this.crosshair)

    this.inventory = new Inventory(6)
    this.inventory.pivot.set(this.inventory.width, this.inventory.height)
    this.addChild(this.inventory)

    app.console = this.console = new Console()
    this.console.pivot.set(this.console.width, 0)
    this.addChild(this.console)

    this.on('added', () => {
      this.addElements()
      this.resize()
    })
  }

  addElements() {
    this.miniMap = new MiniMap(this.map, this.viewport)
    this.addChild(this.miniMap)
  }

  resize() {
    const {width, height} = app.screen
    this.inventory.x = width
    this.inventory.y = height
    this.console.position.set(width, 0)
    this.crosshair.position.set((width / 2) | 0, (height / 2) | 0)
  }

  update(time) {
    this.miniMap.update(time)
    this.console.update(time)
  }
}