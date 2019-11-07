const app = new PIXI.Application({
  autoResize: true,
  resolution: devicePixelRatio
})
document.body.appendChild(app.view)

let loader = PIXI.Loader.shared
loader.add('sheet', 'assets/ss.json')
loader.load(init)

function init () {
  let sheet = loader.resources.sheet
  let spr = new PIXI.Sprite(sheet.textures['bricks'])
  const inventory = new Inventory(8)

  app.stage.addChild(spr)
  app.stage.addChild(inventory)
}

window.addEventListener('resize', resize)

function resize () {
  app.renderer.resize(window.innerWidth, window.innerHeight)
}

resize()