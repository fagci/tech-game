const app = new App()

const res = new Res()
res.load(init)

let gui = new GUI()
app.stage.addChild(gui)

function init () {
  let sheet = res.resources.sheet
  let spr = new PIXI.Sprite(sheet.textures['bricks'])
  gui.inventory.addItem(spr)
}

window.addEventListener('resize', () => gui.resize())
