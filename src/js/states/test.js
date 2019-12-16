import * as PIXI from 'pixi.js'
import Controls from '../controls'
import State from '../state'
import GameObject from '../game-object'
import GUI from '../gui'
import {InventoryItem} from '../inventory'

import {Viewport} from 'pixi-viewport'

export default class TestState extends State {
  constructor(app) {
    super(app)
    this.controls = new Controls()
    this.map = new PIXI.Container()

    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1024,
      worldHeight: 1024,
      interaction: app.renderer.plugins.interaction
    })

    this.addChild(this.viewport)

    this.viewport
      .drag({clampWheel: true, mouseButtons: 'left'})
      .pinch()
      .wheel()
      .decelerate()
      .clampZoom({
        minHeight: app.renderer.screen.height / 4,
        minWidth: app.renderer.screen.width / 4,
        maxHeight: app.renderer.screen.height * 4,
        maxWidth: app.renderer.screen.width * 4,
      })
      .clamp({ direction: 'all' })

    const bgG = new PIXI.Graphics()

    bgG.lineStyle(0, 0, 1, 0)
    bgG.beginFill(0x888888), bgG.drawRect(0, 0, 64, 64), bgG.endFill()
    bgG.beginFill(0x444444), bgG.drawRect(0, 0, 32, 32), bgG.endFill()
    bgG.beginFill(0x444444), bgG.drawRect(32, 32, 32, 32), bgG.endFill()


    const bgT = this.app.renderer.generateTexture(bgG)
    const bgGrid = new PIXI.TilingSprite(bgT, 1024, 1024)


    this.viewport.addChild(this.map)
    this.map.addChild(bgGrid)

    const go1 = new GameObject()
    go1.position.set(128, 128)
    this.map.addChild(go1)

    const go2 = new GameObject()
    go2.position.set(256, 64)
    this.map.addChild(go2)

    const invItem = new InventoryItem()
    const gui = new GUI(app)

    gui.inventory.addItem(invItem)
    this.addChild(gui)

    this.drone = new Drone()
    this.drone.position.set(100, 100)
    this.map.addChild(this.drone)

    window.addEventListener('resize', () => {
      gui.resize()
      this.viewport.resize(window.innerWidth, window.innerHeight)
    })
  }

  update = (time) => {
    let dx = 0,
      dy = 0
    if (this.controls.getKeyDown([38, 87])) dy -= time
    if (this.controls.getKeyDown([40, 83])) dy += time
    if (this.controls.getKeyDown([37, 65])) dx -= time
    if (this.controls.getKeyDown([39, 68])) dx += time

    if (dx !== 0 || dy !== 0) {
      const div = Math.sqrt(dx * dx + dy * dy) / 10.0

      // this.moveCamera(dx / div, dy / div)
    }

    this.map.children.forEach(c => c.update && c.update(time))
  }
}

class Drone extends PIXI.Sprite {
  constructor() {
    super()

    const g = new PIXI.Graphics()
    g.lineStyle(2, 0x00ff00)
    g.moveTo(0, 0)
    g.lineTo(30, 15)
    g.lineTo(0, 30)
    this.addChild(g)

    this.anchor.set(0.5)
  }
}