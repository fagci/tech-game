const app = new PIXI.Application({
  autoResize: true,
  resolution: devicePixelRatio
})
document.body.appendChild(app.view)
app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'
app.renderer.autoDensity = true

let loader = PIXI.Loader.shared
loader.add('sheet', 'assets/ss.json')
loader.load(init)

let inventory = new Inventory(8)
inventory.pivot.x = inventory.width / 2
inventory.pivot.y = inventory.height
app.stage.addChild(inventory)

function init () {
  let sheet = loader.resources.sheet
  let spr = new PIXI.Sprite(sheet.textures['bricks'])
  inventory.addItem(spr)
}

window.addEventListener('resize', resize)

function resize () {
  app.renderer.resize(window.innerWidth, window.innerHeight)
  inventory.x = app.renderer.view.width / 2
  inventory.y = app.renderer.view.height
}

resize()