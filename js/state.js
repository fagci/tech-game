class State extends PIXI.Container {
  /**
   * @param {PIXI.Application} app
   */
  constructor (app) {
    super()
    this.app = app
    this.name = this.constructor.name

    this.onEnter = function () {}
    this.onExit = function () {}

    this.onPause = () => this.app.renderer.stop()
    this.onResume = () => this.app.renderer.start()
  }
}