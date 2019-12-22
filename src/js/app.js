import * as PIXI from 'pixi.js'

export default class App extends PIXI.Application {
  constructor() {
    super({
      // antialias: true,
      backgroundColor: 0x88eeff,
      resizeTo: window,
    })
    PIXI.settings.ROUND_PIXELS = true
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
    // PIXI.settings.ANISOTROPIC_LEVEL = 16

    this.view.addEventListener('contextmenu', e => {
      e.preventDefault()
    })

    document.body.appendChild(this.view)
  }
}