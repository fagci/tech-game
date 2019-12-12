class Game extends PIXI.Container {
  constructor (app) {
    super()
    console.log('Game init start')

    this.app = app
    this.stateManager = new StateManager(app)
    console.log('Game init end')
  }

  update () {
    this.stateManager.update()
  }

  start () {
    console.log('Game start')
    this.stateManager.push(new TestState(this.app))
    this.app.ticker.add(this.update)
    console.log('Game end')
  }
}