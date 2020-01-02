import * as PIXI from 'pixi.js'
import {Viewport} from 'pixi-viewport'
import State from './state'
import GUI from '../ui/gui'

import {InventoryItem} from '../ui/inventory'
import GameMap from '../game-map'

import World from '../arch/ecs/world'
import Physics from '../arch/systems/physics'
import EntityManager from '../arch/ecs/entity-manager'
import Render from '../arch/systems/render'

export default class TestState extends State {
  WORLD_WIDTH: number
  WORLD_HEIGHT: number
  map: GameMap
  viewport: Viewport
  gui: GUI
  world: World

  constructor() {
    super()

    // Create things

    this.WORLD_WIDTH = 8192
    this.WORLD_HEIGHT = 8192

    this.map = new GameMap()
    this.viewport = new Viewport({
      screenWidth: window.app.screen.width,
      screenHeight: window.app.screen.height,
      worldWidth: this.WORLD_WIDTH,
      worldHeight: this.WORLD_HEIGHT,
      interaction: window.app.renderer.plugins.interaction,
    })

    // const playerBase = new Base()
    // const drone = new Drone()
    const invItem = new InventoryItem()
    this.gui = new GUI(this.map, this.viewport)


    // Set things options

    this.viewport
      .drag({clampWheel: true, mouseButtons: 'left'})
      .pinch({
        percent: 3,
      })
      .wheel()
      .decelerate()
      .clampZoom({
        minHeight: (window.app.renderer.screen.height / 4) | 0,
        minWidth: (window.app.renderer.screen.width / 4) | 0,
        maxHeight: (window.app.renderer.screen.height * 4) | 0,
        maxWidth: (window.app.renderer.screen.width * 4) | 0,
      })
      .clamp({direction: 'all'})

    // Positioning things


    const WORLD_W2 = (this.WORLD_WIDTH / 2) | 0
    const WORLD_H2 = (this.WORLD_HEIGHT / 2) | 0
    // playerBase.position.set(WORLD_W2, WORLD_H2)
    this.viewport.moveCenter(WORLD_W2, WORLD_H2) // FIXME: initial image w/o artifacts


    // Setup stage

    this.addChild(this.viewport)

    // this.map.entitiesLayer.addChild(playerBase)


    this.gui.inventory.addItem(invItem)
    // this.map.entitiesLayer.addChild(drone)

    this.viewport.addChild(this.map)
    this.addChild(this.gui)

    const texture = window.app.textures.sand
    const sprite = new PIXI.Sprite(texture)
    const bgT = window.app.renderer.generateTexture(sprite, PIXI.SCALE_MODES.NEAREST, window.devicePixelRatio)
    const bgGrid = new PIXI.TilingSprite(bgT, this.WORLD_WIDTH, this.WORLD_HEIGHT)
    this.map.groundLayer.addChild(bgGrid)


    const cross = new PIXI.Graphics()
      .lineStyle(1, 0xff0000, 1, 0)
      .moveTo(-100, 0)
      .lineTo(100, 0)
      .moveTo(0, -100)
      .lineTo(0, 100)
    cross.position.set((this.WORLD_WIDTH / 2) | 0, (this.WORLD_HEIGHT / 2) | 0)
    this.map.groundLayer.addChild(cross)


    const world = new World(this.map.entitiesLayer)
    this.world = world
    EntityManager.setWorld(world)
    world
      .addEntity(EntityManager.createEntity('Turret'))
      .addSystem(new Physics(world))
      .addSystem(new Render(world))

    console.log(`World: ${world}`)


    window.addEventListener('resize', () => {
      this.gui.resize()
      this.viewport.resize(window.app.screen.width, window.app.screen.height)
    })
  }

  update(dt: number) {
    this.map.update(dt)
    this.gui.update(dt)
    this.world.update(dt)
  }
}

