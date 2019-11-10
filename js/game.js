class Game extends PIXI.Container {
  constructor (app, opt) {
    super()
    this.camera = new PIXI.Container()
    this.map = new PIXI.Container()

    this.map.width = 1024
    this.map.height = 1024

    this.addChild(this.map)

    const RW2 = (app.renderer.width / 2) | 0;
    const RH2 = (app.renderer.height / 2) | 0;
    
    let bgG = new PIXI.Graphics()
    
    bgG.lineStyle(1, 0x666666)
    bgG.moveTo(0, 0)
    bgG.lineTo(0, 32)
    bgG.moveTo(0, 0)
    bgG.lineTo(32, 0)

    let bgT = app.renderer.generateTexture(bgG)

    this.bg = new PIXI.TilingSprite(bgT, RW2 * 2, RH2 * 2)
    this.addChild(this.bg)

    this.camera.position.set(RW2, RH2)
    this.pivot.copyFrom(this.camera.position)
    this.position.x = RW2
    this.position.y = RH2
  }

  onCameraMovement (dx, dy, preventNormalization) {
    let cx = this.camera.position.x 
    let cy = this.camera.position.y 
    if(preventNormalization) {
      cx += dx
      cy += dy
    } else {
      const div = Math.sqrt(dx * dx + dy * dy) / 10.0
      cx += dx / div
      cy += dy / div
    }

    if(cx < 0) cx = 0
    if(cy < 0) cy = 0
    if(cx > this.width) cx = this.width
    if(cy > this.height) cy = this.height

    cx |= 0
    cy |= 0

    this.camera.position.set(cx, cy)

    this.pivot.copyFrom(this.camera.position)
  }
}