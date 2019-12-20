import * as PIXI from 'pixi.js'
import Inventory from './inventory'
import MiniMap from './minimap'

export default class GUI extends PIXI.Container {
  constructor (app, map, viewport) {
    super()
    this.app = app

    const crosshair = new PIXI.Container()
    const cp = new PIXI.Graphics()

    cp.lineStyle(1, 0xffffff)
    cp.beginFill(0xffffff)
    cp.moveTo(0, 0)
    cp.lineTo(11, 11)
    cp.moveTo(11, 0)
    cp.lineTo(0, 11)
    cp.endFill()

    crosshair.pivot.set(5, 5)

    crosshair.addChild(cp)
    this.crosshair = crosshair
    this.addChild(crosshair)

    this.inventory = new Inventory(6)
    this.inventory.pivot.set(this.inventory.width / 2, this.inventory.height)
    this.addChild(this.inventory)

    this.miniMap = new MiniMap(map, viewport)
    this.addChild(this.miniMap)

    this.resize()
  }

  resize () {
    this.inventory.x = this.app.screen.width / 2
    this.inventory.y = this.app.screen.height
    this.crosshair.position.set((this.app.renderer.width / 2) | 0, (this.app.renderer.height / 2) | 0)
  }

  update (time) {
    this.miniMap.update(time)
  }
}