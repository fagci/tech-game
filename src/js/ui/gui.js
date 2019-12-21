import * as PIXI from 'pixi.js'
import Inventory from './inventory'
import MiniMap from './minimap'

export default class GUI extends PIXI.Container {
  constructor(app, map, viewport) {
    super()
    this.map = map
    this.viewport = viewport
    this.app = app

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
    this.inventory.pivot.set(this.inventory.width / 2, this.inventory.height)
    this.addChild(this.inventory)

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
    this.inventory.x = this.app.screen.width / 2
    this.inventory.y = this.app.screen.height
    this.crosshair.position.set((this.app.renderer.width / 2) | 0, (this.app.renderer.height / 2) | 0)
  }

  update(time) {
    this.miniMap.update(time)
  }
}