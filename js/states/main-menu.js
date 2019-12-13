class MainMenuState extends State {
  constructor (app) {
    super(app)

    const MENU = [
      { title: 'New game', onClick: e => console.log(e.title) }
    ]

    this.menuContainer = new PIXI.Sprite()
    this.menuContainer.pivot.set(-0.5)
    this.addChild(this.menuContainer)

    MENU.forEach(item => {
      const button = new Button(item.title)
      this.menuContainer.addChild(button)
    })

    window.addEventListener('resize', () => {
      this.rearrangeButtons()
    })
    this.rearrangeButtons()
  }

  rearrangeButtons () {
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    this.menuContainer.position.x = x
    this.menuContainer.position.y = y
    this.menuContainer.children.forEach(c => c.position.x = x)
  }
}

class Button extends PIXI.Sprite {
  constructor (title) {
    super()
    this.title = title
    this.interactive = true
    this.buttonMode = true

    const PADDING = 8

    this.titleText = new PIXI.Text(this.title, { fontFamily: 'Roboto', fontSize: 24, fill: 0xffffff })
    this.titleText.position.set(PADDING, PADDING)

    this.bg = new PIXI.Graphics()

    const titleHeight = this.titleText.height
    const titleWidth = this.titleText.width

    this.bg.lineStyle(1, 0xffffff)
    this.bg.beginFill(0x000000)
    this.bg.drawRect(0, 0, PADDING * 2 + titleWidth, PADDING * 2 + titleHeight)
    this.bg.endFill()

    this.addChild(this.bg)
    this.addChild(this.titleText)

    this.pivot.set(0.5)
  }
}