import * as PIXI from 'pixi.js'
import StateManager from './states/state-manager'
import SplashState from './states/spalsh'

export default class Game extends PIXI.Container {
  constructor (app) {
    super()
    this.app = app
    this.app.stateManager = new StateManager(this)
  }

  update = time => this.app.stateManager.update(time)

  start = () => {
    this.app.stateManager.push(new SplashState(this.app))
    this.app.ticker.add(this.update)
    this.app.renderer.render(this.app.stage)
  }
}