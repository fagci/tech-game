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

    console.warn(map, viewport)

    const bg = new PIXI.Graphics()
    bg.lineStyle(1, 0xffffff, 1, 0)
    bg.beginFill(0x000000)
    bg.drawRect(0, 0, 200, 200)
    bg.endFill()

    this.view = new PIXI.Graphics()

    this.addChild(bg)
    this.addChild(this.view)

    this.entities = {}

    const px = 200.0 / this.viewport.worldWidth
    const py = 200.0 / this.viewport.worldHeight

    map.entitiesLayer.on('added', gameObject => {
      console.info('added', gameObject)
      const e = new PIXI.Graphics()
      e.lineStyle(1, 0xffffff, 1, 0)
      e.beginFill(0x00ff00)
      e.drawCircle(0, 0, 5)
      e.endFill()
      e.position.set(gameObject.position.x * px, gameObject.position.y * py)
      this.addChild(e)
    })

    this.viewport.on('moved', e => {

      const vx = this.viewport.left
      const vy = this.viewport.top
      const vw = this.viewport.right - vx
      const vh = this.viewport.bottom - vy

      console.log(`
          vx: ${vx}
          vy: ${vy}
          vw: ${vw}
          vh: ${vh}
      `)

      this.view.position.set(vx * px, vy * py)
      this.view.clear()
      this.view.lineStyle(1, 0xff0000, 0.75, 0)
      this.view.beginFill(0xff0000, 0.24)
      this.view.drawRect(0, 0, vw * px, vh * py)
      this.view.endFill()

    })
  }

  update (time) {

  }
}