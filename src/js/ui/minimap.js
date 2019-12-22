import * as PIXI from 'pixi.js'
import GameMap from '../game-map'
import GameObject from '../game-objects/game-object'
import {Viewport} from 'pixi-viewport'
import Ballistic from '../game-objects/ballistic'

export default class MiniMap extends PIXI.Container {
  /**
   * @param {GameMap} map
   * @param {Viewport} viewport
   */
  constructor(map, viewport) {
    super()
    this.map = map
    this.viewport = viewport

    this.MINIMAP_SIZE = 150.0

    this.alpha = 0.25
    this.interactive = true
    this.buttonMode = true

    this.isPointerDown = false

    this.px = this.MINIMAP_SIZE / this.viewport.worldWidth
    this.py = this.MINIMAP_SIZE / this.viewport.worldHeight

    this.viewport.on('moved', () => this.updateViewportRegion())
    this.on('added', () => {
      this.refresh()
      this.updateViewportRegion()
    })

    this.on('pointerdown', e => {
      this.isPointerDown = true
      this.moveViewportByEvent(e)
    })

    this.on('pointerup', () => this.isPointerDown = false)

    this.on('pointermove', e => {
      if (e.target === this) this.alpha = 1
      if (this.isPointerDown) this.moveViewportByEvent(e)
    })

    this.on('pointerout', () => this.alpha = 0.25)
  }

  moveViewportByEvent(e) {
    const pos = e.data.getLocalPosition(this)
    this.viewport.moveCenter(pos.x / this.px, pos.y / this.py)
    this.updateViewportRegion()
  }

  updateViewportRegion() {
    const {left, top, right, bottom} = this.viewport
    const vw = right - left
    const vh = bottom - top

    this.view.position.set(left * this.px, top * this.py)

    this.view
      .clear()
      .lineStyle(1, 0xff0000, 0.75, 0)
      .beginFill(0xff0000, 0.24)
      .drawRect(0, 0, vw * this.px, vh * this.py)
      .endFill()
  }

  refresh() {
    const bg = new PIXI.Graphics()
      .lineStyle(1, 0, 1, 1)
      .beginFill(0x223844)
      .drawRect(0, 0, this.MINIMAP_SIZE, this.MINIMAP_SIZE)
      .endFill()

    this.view = new PIXI.Graphics()

    this.removeChildren()
    this.addChild(bg)
    this.addChild(this.view)

    this.map.entitiesLayer.children.forEach(gameObject => {
      if (gameObject instanceof GameObject) {
        this.addChild(new MiniMapEntity(gameObject))
      }
    })
  }

  update() {
    this.children.forEach(miniMapEntity => {
      if (!(miniMapEntity instanceof MiniMapEntity)) return
      miniMapEntity.position.set(miniMapEntity.gameObject.position.x * this.px, miniMapEntity.gameObject.position.y * this.py)
    })
  }
}

class MiniMapEntity extends PIXI.Graphics {
  /**
   * @param {GameObject} gameObject
   */
  constructor(gameObject) {
    super()
    this.gameObject = gameObject

    let color = 0x00ff00

    if (gameObject instanceof Ballistic) {
      color = 0xff0000
    }

    this
      .lineStyle(1, color, 0.75, 0)
      .beginFill(color, 0.75)
      .drawCircle(0, 0, 3)
      .endFill()
  }
}