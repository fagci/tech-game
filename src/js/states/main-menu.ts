import * as PIXI from 'pixi.js'
import State from './state'

export default class MainMenuState extends State {
  menuContainer: PIXI.Container

  constructor() {
    super()

    const MENU = [
      {title: 'New game', onClick: (e: any) => console.log(e.title)},
      {title: 'Settings', onClick: (e: any) => console.log(e.title)},
      {title: 'Exit', onClick: (e: any) => console.log(e.title)},
    ]

    this.menuContainer = new PIXI.Container()

    MENU.forEach((item, i) => {
      const button = new Button(item.title)
      button.y = i * (button.h + 16)
      this.menuContainer.addChild(button)
    })

    this.addChild(this.menuContainer)

    this.menuContainer.position.set(32, 32)
  }
}

class Button extends PIXI.Sprite {
  PADDING: number
  title: string
  titleText: PIXI.Text
  bg: PIXI.Graphics
  mouseover: (e: any) => number
  mouseout: (e: any) => number
  w: number
  h: number

  constructor(title: string) {
    super()
    this.PADDING = 12
    this.title = title
    this.interactive = true
    this.buttonMode = true

    this.titleText = new PIXI.Text(this.title, {fontFamily: 'Roboto', fontSize: 18, fill: 0xffffff})
    this.bg = new PIXI.Graphics()


    const titleHeight = this.titleText.height
    const titleWidth = this.titleText.width

    this.w = this.PADDING * 4 + titleWidth
    this.h = this.PADDING * 2 + titleHeight

    this.titleText.position.set(this.PADDING * 2, this.PADDING)

    this.drawBg(0x000000)
    this.alpha = 0.75

    this.addChild(this.bg)
    this.addChild(this.titleText)

    this.mouseover = e => this.alpha = 1
    this.mouseout = e => this.alpha = 0.75
  }

  drawBg(color: number) {
    this.bg
      .lineStyle(1, 0xffffff)
      .beginFill(color)
      .drawRect(0, 0, this.w, this.h)
      .endFill()
  }
}