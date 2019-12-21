import * as PIXI from 'pixi.js'
import GameMap from '../game-map'
import {Viewport} from 'pixi-viewport'

export default class MiniMap extends PIXI.Container {
  /**
   * @param {GameMap} map
   * @param {Viewport} viewport
   */
  constructor(app, map, viewport) {
    super()
    this.app = app
    this.map = map
    this.viewport = viewport

    this.interactive = true
    this.buttonMode = true



    this.px = 200.0 / this.viewport.worldWidth
    this.py = 200.0 / this.viewport.worldHeight


    this.viewport.on('moved', e => this.updateViewportRegion())
    this.on('added', e => {
      console.info('Minimap added')
      this.refresh()
      this.updateViewportRegion()
    })

    this.isPointerDown = false

    this.on('pointerdown', e => {
      this.isPointerDown = true
      this.moveViewportByEvent(e)
    })

    this.on('pointerup', e => {
      this.isPointerDown = false
    })

    this.on('pointermove', e => {
      if(this.isPointerDown) this.moveViewportByEvent(e)
    })
  }

  moveViewportByEvent(e){
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
    bg.drawRect(0, 0, 200, 200)
    bg.endFill()

    this.view = new PIXI.Graphics()

    this.addChild(bg)
    this.addChild(this.view)

    const rt = PIXI.RenderTexture.create({width:200,height:200, resolution: this.px})
    this.app.renderer.render(this.map, rt)
    const sprite = new PIXI.Sprite(rt)
    // sprite.scale.set(this.px,this.py)
    sprite.position.set(0,0)
    this.addChild(sprite)

    this.map.entitiesLayer.children.forEach(gameObject => {
      const e = new PIXI.Graphics()
      e.lineStyle(1, 0x00ff00, 0.75, 0)
      e.beginFill(0x00ff00, 0.24)
      e.drawCircle(0, 0, 5)
      e.endFill()
      e.position.set(gameObject.position.x * this.px, gameObject.position.y * this.py)
      e.gameObject = gameObject
      this.addChild(e)
    })
  }

  update(time) {
    this.children.forEach(e => {
      if (e.gameObject) {
        e.position.set(e.gameObject.position.x * this.px, e.gameObject.position.y * this.py)
      }
    })
  }
}