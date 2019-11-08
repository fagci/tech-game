const app = new App()

const res = new Res()
res.load(init)

let inventory = new Inventory(8)
inventory.pivot.set(inventory.width / 2, inventory.height)
app.stage.addChild(inventory)

function init () {
  let sheet = res.resources.sheet
  let spr = new PIXI.Sprite(sheet.textures['bricks'])
  inventory.addItem(spr)
}

function resize () {
  inventory.x = app.screen.width / 2
  inventory.y = app.screen.height
}

window.addEventListener('resize', resize)
resize()