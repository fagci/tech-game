import * as PIXI from 'pixi.js'

export default class App extends PIXI.Application {
  constructor() {
    super({
      backgroundColor: 0x08151b,
      resizeTo: window,
    })
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
    PIXI.settings.ROUND_PIXELS = true
    document.body.appendChild(this.view)
  }
}