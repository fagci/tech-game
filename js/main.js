const app = new App()

const controls = new Controls()
const game = new Game(app)
const gui = new GUI(app)

app.stage.addChild(game)
app.stage.addChild(gui)

const g = new PIXI.Graphics()
g.lineStyle(1, 0x1D313B)
g.beginFill(0x253B45)
g.drawRect(0, 0, 64, 64)
g.endFill()

g.position.set(128,128)

game.map.addChild(g)

const t = new PIXI.Text('---', {fontSize:16,fill:0xffffff})
app.stage.addChild(t)

app.ticker.add(gameLoop)

window.addEventListener('drag', e => {
  if(e.dx != 0 || e.dy != 0) 
    game.onCameraMovement(-e.dx, -e.dy, true)
})

function gameLoop(delta) {
  controls.update()
  play()
}

function play () {
  let dx = 0, dy = 0;
  if(controls.getKeyDown([38,87])) dy -= 1
  if(controls.getKeyDown([40,83])) dy += 1
  if(controls.getKeyDown([37,65])) dx -= 1
  if(controls.getKeyDown([39,68])) dx += 1

  if(dx!=0 || dy!=0) game.onCameraMovement(dx, dy)

  t.text = `Camera pos: ${game.camera.position.x},${game.camera.position.y}`
}

window.addEventListener('resize', () => gui.resize())
