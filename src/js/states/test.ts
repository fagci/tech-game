import * as PIXI from 'pixi.js'
import {Viewport} from 'pixi-viewport'
import State from './state'
import GUI from '../ui/gui'

import GameMap from '../game-map'

import World from '../arch/ecs/world'
import Movement from '../arch/systems/movement'
import Render from '../arch/systems/render'
import Weapons from '../arch/systems/weapons'
import Collision from '../arch/systems/collision'
import Energy from '../arch/systems/energy'
import Health from '../arch/systems/health'
import Destroy from '../arch/systems/destroy'

import MapGenerator from '../utils/map-generator'

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

    const {height: screenHeight, width: screenWidth} = window.app.screen

    this.map = new GameMap()
    this.viewport = new Viewport({
      screenWidth,
      screenHeight,
      worldWidth: this.WORLD_WIDTH,
      worldHeight: this.WORLD_HEIGHT,
      interaction: window.app.renderer.plugins.interaction,
    })

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
        minHeight: (screenHeight / 4) | 0,
        minWidth: (screenWidth / 4) | 0,
        maxHeight: (screenHeight * 4) | 0,
        maxWidth: (screenWidth * 4) | 0,
      })
      .clamp({direction: 'all'})

    // Positioning things


    const WORLD_W2 = (this.WORLD_WIDTH / 2) | 0
    const WORLD_H2 = (this.WORLD_HEIGHT / 2) | 0
    this.viewport.moveCenter(WORLD_W2, WORLD_H2)


    // Setup stage

    this.addChild(this.viewport)


    this.viewport.addChild(this.map)
    this.addChild(this.gui)


    const texture = new PIXI.Graphics()
    texture
      .lineStyle(2, 0, 1, 0)
      .drawRect(0, 0, 512, 512)
    const bgT = window.app.renderer.generateTexture(texture, PIXI.SCALE_MODES.NEAREST, window.devicePixelRatio)
    const bgGrid = new PIXI.TilingSprite(bgT, this.WORLD_WIDTH, this.WORLD_HEIGHT)
    bgGrid.zIndex = 100
    this.map.groundLayer.sortableChildren = true
    this.map.groundLayer.addChild(bgGrid)

    const cross = new PIXI.Graphics()
      .lineStyle(1, 0xff0000, 1, 0)
      .moveTo(-100, 0)
      .lineTo(100, 0)
      .moveTo(0, -100)
      .lineTo(0, 100)
    cross.position.set(WORLD_W2, WORLD_H2)
    this.map.groundLayer.addChild(cross)

    this.world =
      new World('Test', this.map.entitiesLayer)
        .addSystem(new Energy())
        .addSystem(new Weapons())
        .addSystem(new Collision())
        .addSystem(new Health())
        .addSystem(new Movement())
        .addSystem(new Render())
        .addSystem(new Destroy())

    window.addEventListener('resize', () => {
      this.gui.resize()
      this.viewport.resize(window.app.screen.width, window.app.screen.height)
    })

    const mapGenerator = new MapGenerator(1)


    this.viewport.on('moved', () => mapGenerator.loadChunksInView(this.viewport, this.map.groundLayer))
    this.viewport.on('zoomed', () => mapGenerator.loadChunksInView(this.viewport, this.map.groundLayer))

    mapGenerator.loadChunksInView(this.viewport, this.map.groundLayer)
  }

  update(dt: number) {
    this.world.update(dt)
  }
}
