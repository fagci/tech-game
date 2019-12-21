import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import Controls from '../controls'
import State from '../state'
import GUI from '../ui/gui'

import { InventoryItem } from '../ui/inventory'
import Base from '../game-objects/base'
import GameMap from '../game-map'
import checkers from '../../assets/checkers.png'
import spriteSheetPng from '../../assets/ss.png'
import spriteSheetJson from '../../assets/ss.json'
import GameObject from "../game-objects/game-object"

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
    this.gui = new GUI(app, this.map, this.viewport)

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

    // Positioning things

    playerBase.position.set(this.WORLD_WIDTH / 2, this.WORLD_HEIGHT / 2)
    drone.position.set(100, 100)
    this.viewport.moveCenter(this.WORLD_WIDTH / 2, this.WORLD_HEIGHT / 2)

    this.loader.add('ss', spriteSheetPng)
    this.loader.load()

    // Setup stage

    this.addChild(this.viewport)

    this.map.entitiesLayer.addChild(playerBase)


    this.gui.inventory.addItem(invItem)
    this.map.entitiesLayer.addChild(drone)

    this.viewport.addChild(this.map)
    this.addChild(this.gui)

    window.addEventListener('resize', () => {
      this.gui.resize()
      this.viewport.resize(window.innerWidth, window.innerHeight)
    })
  }

  init (loader, resources) {
    console.log(resources)
    const spriteSheetTexture = resources.ss.texture
    const spriteSheet = new PIXI.Spritesheet(spriteSheetTexture, spriteSheetJson)
    spriteSheet.parse(textures => {
      const texture = textures.grass
      const sprite = new PIXI.Sprite(texture)
      const bgT = this.app.renderer.generateTexture(sprite, PIXI.SCALE_MODES.NEAREST, 1)
      const bgGrid = new PIXI.TilingSprite(bgT, this.WORLD_WIDTH, this.WORLD_HEIGHT)
      bgGrid.zIndex = -1
      this.map.groundLayer.addChild(bgGrid)
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

    this.map.update(time)
    this.gui.update(time)
  }
}

class Drone extends GameObject {
  constructor () {
    super()

    this.phase = 0;

    const g = new PIXI.Graphics()
    g.lineStyle(3, 0x222222)
    g.beginFill(0xee6600, 0.24)
    g.moveTo(0, 0)
    g.lineTo(30, 15)
    g.lineTo(0, 30)
    g.endFill()
    this.addChild(g)
  }

  getDirectionAngle (anchor, point) {
    return Math.atan2(anchor.y - point.y, anchor.x - point.x) + Math.PI;
  }

  update (time) {
    const r = 100
    this.phase += time * 0.01;
    // console.log(this.phase)
    const x = Math.cos(this.phase) * r + 10240 / 2
    const y = Math.sin(this.phase) * r + 10240 / 2

    const oldPosition = new PIXI.Point()
    const newPosition = new PIXI.Point(x,y)

    this.position.copyTo(oldPosition)
    this.position.copyFrom(newPosition)

    this.rotation = this.getDirectionAngle(oldPosition, newPosition)
  }
}