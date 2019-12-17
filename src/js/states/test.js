import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import Controls from '../controls'
import State from '../state'
import GUI from '../gui'

import { InventoryItem } from '../inventory'
import Base from '../game-objects/base'

export default class TestState extends State {
  constructor (app) {
    super(app)

    // Create things

    this.controls = new Controls()
    this.level = new PIXI.Container()
    this.ground = new PIXI.Container()
    this.entitiesLayer = new PIXI.Container()
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1024,
      worldHeight: 1024,
      interaction: app.renderer.plugins.interaction
    })
    const bgGrid = this.createBackgroundGrid()

    const playerBase = new Base()
    const drone = new Drone()
    const invItem = new InventoryItem()
    const gui = new GUI(app)

    // Set things options

    this.viewport
      .drag({ clampWheel: true, mouseButtons: 'left' })
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

    // Setup stage

    this.addChild(this.viewport)
    this.viewport.addChild(this.level)

    this.level.addChild(this.ground)
    this.level.addChild(this.entitiesLayer)

    this.entitiesLayer.addChild(playerBase)

    this.ground.addChild(bgGrid)

    this.addChild(gui)
    gui.inventory.addItem(invItem)

    this.level.addChild(drone)

    // Positioning things

    playerBase.position.set(512, 512)
    drone.position.set(100, 100)
    this.viewport.moveCenter(512, 512)

    window.addEventListener('resize', () => {
      gui.resize()
      this.viewport.resize(window.innerWidth, window.innerHeight)
    })
  }

  createBackgroundGrid () {
    const bgG = new PIXI.Graphics()

    bgG.lineStyle(0, 0, 1, 0)
    bgG.beginFill(0x888888), bgG.drawRect(0, 0, 64, 64), bgG.endFill()
    bgG.beginFill(0x444444), bgG.drawRect(0, 0, 32, 32), bgG.endFill()
    bgG.beginFill(0x444444), bgG.drawRect(32, 32, 32, 32), bgG.endFill()

    const bgT = this.app.renderer.generateTexture(bgG)
    const bgGrid = new PIXI.TilingSprite(bgT, 1024, 1024)
    return bgGrid
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

    this.ground.children.forEach(c => c.update && c.update(time))
  }
}

class Drone extends PIXI.Sprite {
  constructor () {
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