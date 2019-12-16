import * as PIXI from 'pixi.js'

export default class App extends PIXI.Application {
  constructor () {
    super({
      backgroundColor: 0x08151b,
      resizeTo: window,
      roundPixels: true,
      resolution: window.devicePixelRatio || 1,
    })
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
    PIXI.settings.ANISOTROPIC_LEVEL = 0

    this.view.addEventListener('contextmenu', e => {
      e.preventDefault()
    })

    document.body.appendChild(this.view)
  }
}