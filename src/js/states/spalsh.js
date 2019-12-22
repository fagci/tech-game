import State from "./state"

const spriteSheetPng = '/ss.png'
const spriteSheetJson = '/ss.json'
const spriteSheet2Png = '/swss.png'
const spriteSheet2Json = '/swss.json'
import * as PIXI from "pixi.js"
import TestState from "./test"

export default class SplashState extends State {
  constructor() {
    super()

    this.progressbar = new PIXI.Container()

    this.progressbarText = new PIXI.Text('Loading...', {fill: 0})

    this.progressbarText.position.y = -32

    this.progressbarGraphics = new PIXI.Graphics()
    const progressbarRect = new PIXI.Graphics()
    progressbarRect.lineStyle(1, 0xffffff, 1, 1)
    progressbarRect.beginFill(0x223344)
    this.progressBarWidth = app.screen.width - 64
    progressbarRect.drawRect(0, 0, this.progressBarWidth, 16)
    progressbarRect.endFill()


    this.progressbar.addChild(this.progressbarText)
    this.progressbar.addChild(progressbarRect)
    this.progressbar.addChild(this.progressbarGraphics)

    this.progressbar.pivot.set((this.progressbar.width / 2) | 0, (this.progressbar.height / 2) | 0)

    this.addChild(this.progressbar)
    this.progressbar.position.set((app.screen.width / 2) | 0, (app.screen.height / 2) | 0)

    this.loader.add('ss', spriteSheetJson)
    this.loader.add('ss2', spriteSheet2Json)
    this.loader.load()
  }

  drawProgress(percent) {
    this.progressbarGraphics.clear()
    this.progressbarGraphics.beginFill(0x882222)
    this.progressbarGraphics.drawRect(0, 0, app.screen.width - 64, 16)
    this.progressbarGraphics.endFill()

    this.progressbarText.text = `Loading... ${percent}%`
  }

  init(loader, resources) {
    app.textures = {...resources.ss.textures, ...resources.ss2.textures}
    this.removeChildren()
    app.stateManager.push(new TestState(app))
  }

  progress(loader, resources) {
    this.drawProgress(loader.progress)
  }
}