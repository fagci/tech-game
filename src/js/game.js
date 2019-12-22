import * as PIXI from 'pixi.js'
import StateManager from './states/state-manager'
import SplashState from './states/spalsh'

export default class Game extends PIXI.Container {
  constructor() {
    super()
    app.stateManager = new StateManager(this)
  }

  update = time => app.stateManager.update(time)

  start = () => {
    app.stateManager.push(new SplashState())
    app.ticker.add(this.update)
  }
}