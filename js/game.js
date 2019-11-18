class Game extends PIXI.Container {
  constructor (app, opt) {
    super()
    this.app = app
    this.camera = new PIXI.Container()
    this.map = new PIXI.Container()

    let bgG = new PIXI.Graphics()

    bgG.lineStyle(1, 0x444444)
    bgG.moveTo(0, 0)
    bgG.lineTo(0, 31)
    bgG.moveTo(0, 0)
    bgG.lineTo(31, 0)

    let bgT = this.app.renderer.generateTexture(bgG)
    this.bg = new PIXI.TilingSprite(bgT, 1025, 1025)

    this.laserLayer = new PIXI.Graphics()

    this.addChild(this.bg)
    this.addChild(this.map)
    this.addChild(this.laserLayer)

    this.updateCamera()
    this.app.ticker.add(this.gameLoop)

    this.interactive = true
    this.on('click', e => {
      console.log('From game:', e.type, e.target)
    })
  }

  gameLoop = (t) => {
    this.map.children.forEach(c => {c.update && c.update(t)})
  }

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
    let { x, y } = this.camera.position

    x += dx
    y += dy

    if (x < 0) x = 0
    if (y < 0) y = 0
    if (x > this.width) x = this.width
    if (y > this.height) y = this.height

    this.setCameraPosition(x | 0, y | 0)
  }
}