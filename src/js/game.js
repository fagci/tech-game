import * as PIXI from 'pixi.js'
import StateManager from './state-manager'
import MainMenuState from './states/main-menu'
import TestState from './states/test'

export default class Game extends PIXI.Container {
  constructor (app) {
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