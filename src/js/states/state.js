import * as PIXI from 'pixi.js'

export default class State extends PIXI.Container {
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