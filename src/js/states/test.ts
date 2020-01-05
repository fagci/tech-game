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

const Noise = require('noisejs').Noise

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

    const texture = window.app.textures.sand


    const noise = new Noise()
    const worldCellSizeW = this.WORLD_WIDTH / 16
    const worldCellSizeH = this.WORLD_HEIGHT / 16


    // const sprite = new PIXI.Sprite(texture)
    // const bgT = window.app.renderer.generateTexture(sprite, PIXI.SCALE_MODES.NEAREST, window.devicePixelRatio)
    // const bgGrid = new PIXI.TilingSprite(bgT, this.WORLD_WIDTH, this.WORLD_HEIGHT)
    // this.map.groundLayer.addChild(bgGrid)

    let groundContainer = new PIXI.Container()
    for (let j = 0; j < worldCellSizeH; j++) {
      for (let i = 0; i < worldCellSizeW; i++) {
        let t
        let value = noise.perlin2(i / 80, j / 80)
          + 0.5 * noise.perlin2(i / 50, j / 50)
          + 0.25 * noise.perlin2(i / 25, j / 25)

        if (value < 0.15) t = window.app.textures.sand
        else if (value < 0.22) t = window.app.textures.ground
        else if (value < 0.6) t = window.app.textures.grass
        else t = window.app.textures.snow
        let s = PIXI.Sprite.from(t)
        s.position.set(i * 16, j * 16)
        groundContainer.addChild(s)

        if (value < 0.05) {
          s = PIXI.Sprite.from(window.app.textures.water)
          s.position.set(i * 16, j * 16)
          groundContainer.addChild(s)
        }
      }
    }

    const bgT = window.app.renderer.generateTexture(groundContainer, PIXI.SCALE_MODES.LINEAR, window.devicePixelRatio)
    const sprite = new PIXI.Sprite(bgT)
    sprite.scale.set(this.gui.miniMap.MINIMAP_SIZE / this.WORLD_WIDTH, this.gui.miniMap.MINIMAP_SIZE / this.WORLD_HEIGHT)
    this.gui.miniMap.addChildAt(sprite, 1)
    groundContainer = null
    this.map.groundLayer.addChild(new PIXI.Sprite(bgT))

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
  }

  update(dt: number) {
    this.world.update(dt)
  }
}
