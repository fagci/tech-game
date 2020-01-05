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

import {Noise} from 'noisejs'

export default class TestState extends State {
  WORLD_WIDTH: number
  WORLD_HEIGHT: number
  map: GameMap
  viewport: Viewport
  gui: GUI
  world: World
  groundContainer: PIXI.Container
  noise: any

  mapHeight: [][] = []

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


    this.noise = new Noise(1)


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

    this.viewport.on('moved-end', () => this.loadChunksInView())
    this.viewport.on('zoomed-end', () => this.loadChunksInView())

    this.loadChunksInView()
  }

  getChunkSprite(col: number, row: number) {
    const tileRow = row << 5
    const tileCol = col << 5
    const x = tileCol << 4
    const y = tileRow << 4
    const container = new PIXI.Container()

    const nextChunkTileRow = (row + 1) << 5
    const nextChunkTileCol = (col + 1) << 5

    console.log(row, col, tileCol, tileRow, nextChunkTileCol, nextChunkTileRow, x, y)

    const {sand, snow, ground, grass} = window.app.textures
    let texture

    for (let j = tileRow; j < nextChunkTileRow; j++) {
      for (let i = tileCol; i < nextChunkTileCol; i++) {
        let heightValue = this.getHeightValue(i, j)
        let tileX = i << 4
        let tileY = j << 4

        if (heightValue < 0.15) texture = sand
        else if (heightValue < 0.22) texture = ground
        else if (heightValue < 0.6) texture = grass
        else texture = snow

        let sprite = PIXI.Sprite.from(texture)

        sprite.position.set(tileX, tileY)
        container.addChild(sprite)

        if (heightValue < 0.05) {
          sprite = PIXI.Sprite.from(window.app.textures.water)
          sprite.position.set(tileX, tileY)
          container.addChild(sprite)
        }
      }
    }

    let bgT = window.app.renderer.generateTexture(container, PIXI.SCALE_MODES.LINEAR, window.devicePixelRatio)
    const chunkSprite = new PIXI.Sprite(bgT)
    chunkSprite.position.set(x, y)
    chunkSprite.name = this.getChunkName(col, row)
    return chunkSprite
  }

  loadChunksInView() {
    const chunkColStart = (this.viewport.left >> 9) - 1
    const chunkRowStart = (this.viewport.top >> 9) - 1
    const chunkColEnd = (this.viewport.right >> 9) + 1
    const chunkRowEnd = (this.viewport.bottom >> 9) + 1

    console.log(chunkColStart, chunkRowStart, chunkColEnd, chunkRowEnd)

    for (let j = chunkRowStart; j < chunkRowEnd; j++) {
      for (let i = chunkColStart; i < chunkColEnd; i++) {
        if (this.map.groundLayer.getChildByName(this.getChunkName(i, j))) continue
        this.map.groundLayer.addChild(this.getChunkSprite(i, j))
      }
    }
  }

  private getChunkName(col: number, row: number) {
    return `Chunk_${col}_${row}`
  }

  private getHeightValue(i: number, j: number) {
    return this.noise.perlin2(i / 80, j / 80)
      + 0.5 * this.noise.perlin2(i / 50, j / 50)
      + 0.25 * this.noise.perlin2(i / 25, j / 25)
  }

  update(dt: number) {
    this.world.update(dt)
  }
}
