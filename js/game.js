class Game extends PIXI.Container {
  constructor(app, opt) {
    super()
    this.camera = new PIXI.Container()
    this.app = app
    this.map = new PIXI.Container()

    this.map.width = 1024
    this.map.height = 1024

    this.addChild(this.map)

    let bgG = new PIXI.Graphics()

    bgG.lineStyle(1, 0x666666)
    bgG.moveTo(0, 0)
    bgG.lineTo(0, 32)
    bgG.moveTo(0, 0)
    bgG.lineTo(32, 0)

    let bgT = this.app.renderer.generateTexture(bgG)

    this.bg = new PIXI.TilingSprite(bgT, 1024, 1024)
    this.addChild(this.bg)
    this.updateCamera()
  }

  updateCamera() {
    const RW2 = this.app.renderer.width / 2;
    const RH2 = this.app.renderer.height / 2;
    this.position.set(RW2 | 0, RH2 | 0)
  }

  setCameraPosition(x, y) {
    this.camera.position.set(x, y)
    this.pivot.copyFrom(this.camera.position)
  }

  moveCamera(dx, dy) {
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