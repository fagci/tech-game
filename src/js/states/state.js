import * as PIXI from 'pixi.js'

export default class State extends PIXI.Container {
  constructor () {
    super()

    this.name = this.constructor.name

    this.onEnter = function () {}
    this.onExit = function () {}

    this.onPause = () => app.renderer.stop()
    this.onResume = () => app.renderer.start()

    this.loader = PIXI.Loader.shared
      .on('error', error => this.error(error))
      .on('progress', (loader, resources) => this.progress(loader, resources))
      .on('complete', (loader, resources) => this.init(loader, resources))
  }

  /**
   * @param {PIXI.Loader} loader
   * @param resources
   */
  progress (loader, resources) {
    //TODO: implement progress indicator
  }

  init (loader, resources) {
    //
  }

  error (error) {console.error(error)}
}