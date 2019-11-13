const app = new App()

const controls = new Controls()
const game = new Game(app)
const gui = new GUI(app)

app.stage.addChild(game)
app.stage.addChild(gui)

const go = new GameObject()
go.position.set(128, 128)
game.map.addChild(go)

const invItem = new InventoryItem()
gui.inventory.addItem(invItem)

const t = new PIXI.Text('---', { fontSize: 16, fill: 0xffffff })
app.stage.addChild(t)

app.ticker.add(gameLoop)

window.addEventListener('drag', e => {
  if (e.dx !== 0 || e.dy !== 0)
    game.moveCamera(-e.dx, -e.dy)
})

function gameLoop (delta) {
  play()
}

function play () {
  let dx = 0, dy = 0
  if (controls.getKeyDown([38, 87])) dy -= 1
  if (controls.getKeyDown([40, 83])) dy += 1
  if (controls.getKeyDown([37, 65])) dx -= 1
  if (controls.getKeyDown([39, 68])) dx += 1

  if (dx !== 0 || dy !== 0) {
    const div = Math.sqrt(dx * dx + dy * dy) / 10.0
    game.moveCamera(dx / div, dy / div)
  }

  t.text = `Camera pos: ${game.camera.position.x},${game.camera.position.y}`
}

window.addEventListener('resize', () => {
  gui.resize()
  game.updateCamera()
})
