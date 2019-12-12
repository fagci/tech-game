class Game extends PIXI.Container {
    constructor(app) {
        super()
        this.app = app
        this.stateManager = new StateManager(this)


    }

    update = time => this.stateManager.update(time)

    start = () => {
        this.stateManager.push(new TestState(this.app))
        this.app.ticker.add(this.update)
        this.app.renderer.render(this.app.stage)
    }
}