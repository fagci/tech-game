class App extends PIXI.Application {
  constructor () {
    super({
      backgroundColor: 0x08151b,
      resizeTo: window,
    })

    document.body.appendChild(this.view)
    this.renderer.view.style.position = 'absolute'
    this.renderer.view.style.display = 'block'
  }
}