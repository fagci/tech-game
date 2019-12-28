import * as PIXI from 'pixi.js'

export default class State extends PIXI.Container {
  onEnter: () => void
  onExit: () => void
  onPause: () => any
  onResume: () => any
  loader: PIXI.Loader

  constructor() {
    super()

    this.name = this.constructor.name

    this.onEnter = function () {
    }
    this.onExit = function () {
    }

    this.onPause = () => window.app.stop()
    this.onResume = () => window.app.start()

    this.loader = PIXI.Loader.shared
      .on('error', error => this.error(error))
      .on('progress', (loader, resources) => this.progress(loader, resources))
      .on('complete', (loader, resources) => this.init(loader, resources))
  }

  progress(loader: PIXI.Loader, resources: PIXI.LoaderResource) {
  }

  init(loader: PIXI.Loader, resources: any) {
    //
  }

  error(error: Error) {
    console.error(error)
  }
}