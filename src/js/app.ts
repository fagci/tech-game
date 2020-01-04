import * as PIXI from 'pixi.js'
// import 'pixi-sound'
import 'pixi-layers'
import StateManager from './states/state-manager'


export default class App extends PIXI.Application {
  textures: { [key: string]: PIXI.Texture }
  maps: { [name: string]: any }
  entities: { [name: string]: any }
  // sounds: { [key: string]: PIXI.sound.IMedia }
  stateManager: StateManager

  energyGroup = new PIXI.display.Group(1, false)
  foreGroup = new PIXI.display.Group(10, false)

  miniMapUpdate() {
    throw new Error('Method not implemented.')
  }

  constructor() {
    super({
      // antialias: true,
      backgroundColor: 0x88eeff,
      resizeTo: window,
    })

    this.stage = new PIXI.display.Stage()
    this.stage.sortableChildren = true
    const energyLayer = new PIXI.display.Layer(this.energyGroup)
    energyLayer.on('display', element => {
      element.blendMode = PIXI.BLEND_MODES.DARKEN
    })
    this.stage.addChild(energyLayer)
    this.stage.addChild(new PIXI.display.Layer(this.foreGroup))
    // PIXI.settings.ROUND_PIXELS = true
    // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
    // PIXI.settings.ANISOTROPIC_LEVEL = 16

    this.view.addEventListener('contextmenu', e => {
      e.preventDefault()
    })

    document.body.appendChild(this.view)
  }
}