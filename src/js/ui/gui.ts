import * as PIXI from 'pixi.js'
import Inventory from './inventory'
import MiniMap from './minimap'
import Console from './console'

export default class GUI extends PIXI.Container {
  constructor(map, viewport) {
    super()
    this.map = map
    this.viewport = viewport

    this.inventory = new Inventory(6)
    this.inventory.pivot.set(this.inventory.width, this.inventory.height)
    this.addChild(this.inventory)

    window.app.console = this.console = new Console()
    this.console.pivot.set(this.console.width, 0)
    this.addChild(this.console)

    this.on('added', () => {
      this.addElements()
      this.resize()
    })
  }

  addElements() {
    this.miniMap = new MiniMap(this.map, this.viewport)
    window.app.miniMapUpdate = this.miniMap.refresh.bind(this.miniMap)
    this.addChild(this.miniMap)
  }

  resize() {
    const {width, height} = window.app.screen
    this.inventory.x = width
    this.inventory.y = height
    this.console.position.set(width, 0)
  }

  update(time) {
    this.miniMap.update(time)
    this.console.update(time)
  }
}