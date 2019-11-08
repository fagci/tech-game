const app = new PIXI.Application({
  resolution: window.devicePixelRatio,
  autoDensity: true,
  backgroundColor: 0x08151b,
  resizeTo: window,
})

document.body.appendChild(app.view)
app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'

let loader = PIXI.Loader.shared
loader.add('sheet', 'assets/ss.json')
loader.load(init)

let inventory = new Inventory(8)
inventory.pivot.set(inventory.width / 2, inventory.height)
app.stage.addChild(inventory)

function init () {
  let sheet = loader.resources.sheet
  let spr = new PIXI.Sprite(sheet.textures['bricks'])
  inventory.addItem(spr)
}

window.addEventListener('resize', resize)

function resize () {
  inventory.x = app.screen.width / 2
  inventory.y = app.screen.height
}

resize()