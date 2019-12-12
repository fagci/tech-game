const app = new App()


const game = new Game(app)
app.stage.addChild(game)

game.start()

window.addEventListener('drag', e => {
  if (e.dx !== 0 || e.dy !== 0)
    game.moveCamera(-e.dx, -e.dy)
})

window.addEventListener('resize', () => {
  gui.resize()
  game.updateCamera()
})
