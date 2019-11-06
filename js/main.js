const app = new PIXI.Application({
  autoResize: true,
  resolution: devicePixelRatio
})
document.body.appendChild(app.view)



let loader = PIXI.Loader.shared;
loader.add('sheet', 'assets/ss.json');
loader.load(init);

function init() {
  let sheet = loader.resources.sheet;
  let spr = new PIXI.Sprite(sheet.textures['bricks']);
  app.stage.addChild(spr);
}



window.addEventListener('resize', resize)
function resize() {
  app.renderer.resize(window.innerWidth, window.innerHeight)
}
resize()