class State extends PIXI.Container {
  /**
   * @param {PIXI.Application} app
   */
  constructor (app) {
    super()
    this.app = app
    this.name // Just to identify the State
    this.update = function () {}
    this.render = function () {}
    this.onEnter = function () {
      this.app.stage = this
    }
    this.onExit = function () {}

    // Optional but useful
    this.onPause = function () {
      this.app.renderer.stop()
    }
    this.onResume = function () {
      this.app.renderer.start()
    }
  }
}