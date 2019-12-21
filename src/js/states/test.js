import * as PIXI from 'pixi.js'
import {Viewport} from 'pixi-viewport'
import Controls from '../controls'
import State from './state'
import GUI from '../ui/gui'

import {InventoryItem} from '../ui/inventory'
import Base from '../game-objects/base'
import GameMap from '../game-map'
import {Drone} from "../game-objects/drone"

export default class TestState extends State {
  constructor(app) {
    super(app)

    // Create things

    this.WORLD_WIDTH = 10240
    this.WORLD_HEIGHT = 10240

    this.map = new GameMap()
    this.viewport = new Viewport({
      screenWidth: this.app.screen.width,
      screenHeight: this.app.screen.height,
      worldWidth: this.WORLD_WIDTH,
      worldHeight: this.WORLD_HEIGHT,
      interaction: app.renderer.plugins.interaction
    })

    const playerBase = new Base()
    const drone = new Drone()
    const invItem = new InventoryItem()
    this.gui = new GUI(app, this.map, this.viewport)

    // Set things options

    this.viewport
      .drag({clampWheel: true, mouseButtons: 'left'})
      .pinch()
      .wheel()
      .decelerate()
      .clampZoom({
        minHeight: (app.renderer.screen.height / 4) | 0,
        minWidth: (app.renderer.screen.width / 4) | 0,
        maxHeight: (app.renderer.screen.height * 4) | 0,
        maxWidth: (app.renderer.screen.width * 4) | 0,
      })
      .clamp({direction: 'all'})

    // Positioning things


    const WORLD_W2 = (this.WORLD_WIDTH / 2) | 0
    const WORLD_H2 = (this.WORLD_HEIGHT / 2) | 0
    playerBase.position.set(WORLD_W2, WORLD_H2)
    this.viewport.moveCenter(WORLD_W2, WORLD_H2) // FIXME: initial image w/o artifacts


    // Setup stage

    this.addChild(this.viewport)

    this.map.entitiesLayer.addChild(playerBase)


    this.gui.inventory.addItem(invItem)
    this.map.entitiesLayer.addChild(drone)

    this.viewport.addChild(this.map)
    this.addChild(this.gui)

    const texture = this.app.textures.grass
    const sprite = new PIXI.Sprite(texture)
    const bgT = this.app.renderer.generateTexture(sprite, PIXI.SCALE_MODES.NEAREST, window.devicePixelRatio)
    const bgGrid = new PIXI.TilingSprite(bgT, this.WORLD_WIDTH, this.WORLD_HEIGHT)
    this.map.groundLayer.addChild(bgGrid)

    window.addEventListener('resize', () => {
      this.gui.resize()
      this.viewport.resize(this.app.screen.width, this.app.screen.height)
    })
  }

  update = (time) => {
    this.map.update(time)
    this.gui.update(time)
  }
}

