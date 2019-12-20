import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import Controls from '../controls'
import State from '../state'
import GUI from '../ui/gui'

import { InventoryItem } from '../ui/inventory'
import Base from '../game-objects/base'
import GameMap from '../game-map'
import checkers from '../../assets/checkers.png'

export default class TestState extends State {
  constructor (app) {
    super(app)

    // Create things

    this.WORLD_WIDTH = 10240
    this.WORLD_HEIGHT = 10240

    this.controls = new Controls()
    this.map = new GameMap()
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: this.WORLD_WIDTH,
      worldHeight: this.WORLD_HEIGHT,
      interaction: app.renderer.plugins.interaction
    })

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
    this.viewport.addChild(this.map)

    this.map.groundLayer.addChild(playerBase)

    this.addChild(gui)
    gui.inventory.addItem(invItem)

    this.map.addChild(drone)

    // Positioning things

    playerBase.position.set(this.WORLD_WIDTH / 2, this.WORLD_HEIGHT / 2)
    drone.position.set(100, 100)
    this.viewport.moveCenter(this.WORLD_WIDTH / 2, this.WORLD_HEIGHT / 2)

    this.loader.add('CHECKERS', checkers)
    this.loader.load()

    window.addEventListener('resize', () => {
      gui.resize()
      this.viewport.resize(window.innerWidth, window.innerHeight)
    })
  }

  init (loader, resources) {
    console.log('init test',resources)
    const checkersTexture = resources.CHECKERS.texture
    const sprite = new PIXI.Sprite(checkersTexture)
    const bgT = this.app.renderer.generateTexture(sprite)
    const bgGrid = new PIXI.TilingSprite(bgT, this.WORLD_WIDTH, this.WORLD_HEIGHT)
    bgGrid.zIndex = -1
    this.map.groundLayer.addChild(bgGrid)
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

    this.map.update(time)
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