class Game extends PIXI.Container {
  constructor (app, opt) {
    super()
    this.app = app
    this.camera = new PIXI.Container()
    this.map = new PIXI.Container()

    this.addChild(this.map)

    let bgG = new PIXI.Graphics()

    bgG.lineStyle(1, 0x666666)
    bgG.moveTo(0, 0)
    bgG.lineTo(0, 31)
    bgG.moveTo(0, 0)
    bgG.lineTo(31, 0)

    let bgT = this.app.renderer.generateTexture(bgG)

    this.bg = new PIXI.TilingSprite(bgT, 1025, 1025)
    this.addChild(this.bg)
    this.updateCamera()

    this.app.ticker.add(this.gameLoop)
  }

  gameLoop = (t) => this.map.children.forEach(c => c.update && c.update(t))

  updateCamera () {
    const RW2 = this.app.renderer.width / 2
    const RH2 = this.app.renderer.height / 2
    this.position.set(RW2 | 0, RH2 | 0)
  }

  setCameraPosition (x, y) {
    this.camera.position.set(x, y)
    this.pivot.copyFrom(this.camera.position)
  }

  moveCamera (dx, dy) {
    let cx = this.camera.position.x
    let cy = this.camera.position.y

    cx += dx
    cy += dy

    if (cx < 0) cx = 0
    if (cy < 0) cy = 0
    if (cx > this.width) cx = this.width
    if (cy > this.height) cy = this.height

    this.setCameraPosition(cx | 0, cy | 0)
  }
}