import * as PIXI from 'pixi.js'
import GameMap from '../game-map'
import { Viewport } from 'pixi-viewport'

export default class MiniMap extends PIXI.Container {
  /**
   * @param {GameMap} map
   * @param {Viewport} viewport
   */
  constructor (map, viewport) {
    super()
    this.map = map
    this.viewport = viewport

    const bg = new PIXI.Graphics()
    bg.lineStyle(1, 0xffffff, 1, 0)
    bg.beginFill(0x000000)
    bg.drawRect(0, 0, 200, 200)
    bg.endFill()

    this.view = new PIXI.Graphics()

    this.addChild(bg)
    this.addChild(this.view)

    this.px = 200.0 / this.viewport.worldWidth
    this.py = 200.0 / this.viewport.worldHeight


    this.viewport.on('moved', e => this.updateViewportRegion())
    this.on('added', e => {
      console.info('Minimap added')
      this.refresh()
      this.updateViewportRegion()
    })
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
    this.map.entitiesLayer.children.forEach(gameObject => {
      const e = new PIXI.Graphics()
      e.lineStyle(1, 0xffffff, 1, 0)
      e.beginFill(0x00ff00)
      e.drawCircle(0, 0, 5)
      e.endFill()
      e.position.set(gameObject.position.x * this.px, gameObject.position.y * this.py)
      this.addChild(e)
    })
  }

  update (time) {

  }
}