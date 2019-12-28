import * as PIXI from 'pixi.js'
import StateManager from './states/state-manager'
import SplashState from './states/spalsh'

export default class Game extends PIXI.Container {
  constructor() {
    super()
    window.app.stateManager = new StateManager(this)
  }

  update = time => window.app.stateManager.update(time)

  start = () => {
    window.app.stateManager.push(new SplashState())
    window.app.ticker.add(this.update)
  }

  stop = () => {
    window.app.ticker.remove(this.update)
  }
}