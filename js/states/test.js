class TestState extends State {
  constructor (app) {
    super(app)
    this.app = app
    this.controls = new Controls()
    this.camera = new PIXI.Container()
    this.map = new PIXI.Container()

    let bgG = new PIXI.Graphics()

    bgG.lineStyle(1, 0x444444)
    bgG.moveTo(0, 31)
    bgG.lineTo(0, 0)
    bgG.lineTo(31, 0)

    let bgT = this.app.renderer.generateTexture(bgG)
    this.bg = new PIXI.TilingSprite(bgT, 1025, 1025)

    this.laserLayer = new PIXI.Graphics()

    this.addChild(this.bg)
    this.addChild(this.map)
    this.addChild(this.laserLayer)

    this.updateCamera()
    this.app.ticker.add(this.update)

    this.interactive = true
    this.on('click', e => {
      console.log('From test:', e.type, e.target)
    })

    const go1 = new GameObject()
    go1.position.set(128, 128)
    this.map.addChild(go1)

    const go2 = new GameObject()
    go2.position.set(256, 64)
    this.map.addChild(go2)

    const invItem = new InventoryItem()
    const gui = new GUI(app)

    gui.inventory.addItem(invItem)
    this.addChild(gui)

    this.t = new PIXI.Text('---', { fontSize: 16, fill: 0xffffff })
    this.addChild(this.t)

    window.addEventListener('resize', () => {
      gui.resize()
      this.updateCamera()
    })
    window.addEventListener('drag', e => {
      if (e.dx !== 0 || e.dy !== 0)
        this.moveCamera(-e.dx, -e.dy)
    })
  }

  update = (time) => {
    let dx = 0, dy = 0
    if (this.controls.getKeyDown([38, 87])) dy -= 1
    if (this.controls.getKeyDown([40, 83])) dy += 1
    if (this.controls.getKeyDown([37, 65])) dx -= 1
    if (this.controls.getKeyDown([39, 68])) dx += 1

    if (dx !== 0 || dy !== 0) {
      const div = Math.sqrt(dx * dx + dy * dy) / 10.0
      this.moveCamera(dx / div, dy / div)
    }

    this.map.children.forEach(c => c.update && c.update(time))

    this.t.text = `Camera pos: ${this.camera.position.x},${this.camera.position.y}`
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