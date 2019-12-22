import * as PIXI from 'pixi.js'
import GameMap from '../game-map'
import GameObject from '../game-objects/game-object'
import {Viewport} from 'pixi-viewport'

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
    const vx = this.viewport.left
    const vy = this.viewport.top
    const vw = this.viewport.right - vx
    const vh = this.viewport.bottom - vy

    this.view.position.set(vx * this.px, vy * this.py)
    this.view.clear()
    this.view.lineStyle(1, 0xff0000, 0.75, 0)
    this.view.beginFill(0xff0000, 0.24)
    this.view.drawRect(0, 0, vw * this.px, vh * this.py)
    this.view.endFill()
  }

  refresh() {
    const bg = new PIXI.Graphics()
    bg.lineStyle(1, 0, 1, 1)
    bg.beginFill(0x223844)
    bg.drawRect(0, 0, this.MINIMAP_SIZE, this.MINIMAP_SIZE)
    bg.endFill()

    this.view = new PIXI.Graphics()

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
      if (miniMapEntity instanceof MiniMapEntity) {
        miniMapEntity.position.set(miniMapEntity.gameObject.position.x * this.px, miniMapEntity.gameObject.position.y * this.py)
      }
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
    this.lineStyle(1, 0x00ff00, 0.75, 0)
    this.beginFill(0x00ff00, 0.75)
    this.drawCircle(0, 0, 3)
    this.endFill()
  }
}