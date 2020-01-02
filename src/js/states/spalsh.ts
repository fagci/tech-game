import State from './state'
import * as PIXI from 'pixi.js'
import TestState from './test'

export default class SplashState extends State {
  progressbar: PIXI.Container
  progressbarText: PIXI.Text
  progressBarWidth: number
  progressbarGraphics: PIXI.Graphics
  constructor() {
    super()


    this.progressbar = new PIXI.Container()

    this.progressbarText = new PIXI.Text('Loading...', {fill: 0})

    this.progressBarWidth = window.app.screen.width - 64
    this.progressbarText.position.y = -32

    this.progressbarGraphics = new PIXI.Graphics()

    const progressbarRect = new PIXI.Graphics()
      .lineStyle(1, 0xffffff, 1, 1)
      .beginFill(0x223344)
      .drawRect(0, 0, this.progressBarWidth, 16)
      .endFill()


    this.progressbar.addChild(this.progressbarText)
    this.progressbar.addChild(progressbarRect)
    this.progressbar.addChild(this.progressbarGraphics)

    this.progressbar.pivot.set((this.progressbar.width / 2) | 0, (this.progressbar.height / 2) | 0)

    this.addChild(this.progressbar)
    this.progressbar.position.set((window.app.screen.width / 2) | 0, (window.app.screen.height / 2) | 0)

    this.loader.add('entities', '/entities/entities.json')
    this.loader.add('ss', '/gfx/ss.json')
    this.loader.add('ss2', '/gfx/swss.json')
    this.loader.add('rocket_launch', '/sfx/rocket_launch.mp3')
    this.loader.load()
  }

  drawProgress(percent: number) {
    this.progressbarGraphics
      .clear()
      .beginFill(0x882222)
      .drawRect(0, 0, window.app.screen.width - 64, 16)
      .endFill()

    if (percent < 100) {
      this.progressbarText.text = `Loading... ${percent.toFixed(0)}%`
    } else {
      this.progressbarText.text = 'Ready.'
    }
  }

  init(loader: PIXI.Loader, resources: { [x: string]: any; hasOwnProperty: (arg0: string) => void; }) {
    // console.log(resources)
    for (const resourceKey in resources) {
      if (!resources.hasOwnProperty(resourceKey)) continue
      const resource = resources[resourceKey]
      if (resource.textures) {
        if (!window.app.textures) window.app.textures = {}
        Object.assign(window.app.textures, resource.textures)
      } else if (resource.sound) {
        if (!window.app.sounds) window.app.sounds = {}
        window.app.sounds[resource.name] = resource.sound
      } else if(resource.extension === 'json') {
        window.app.entities = resource.data // TODO: придумать как обозначить контейнер для сущностей, пока так
      }
    }


    this.removeChildren()
    window.app.stateManager.push(new TestState(window.app))
  }

  progress(loader, resources) {
    this.drawProgress(loader.progress)
  }
}