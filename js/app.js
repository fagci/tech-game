class App extends PIXI.Application {
  constructor() {
    super({
      backgroundColor: 0x08151b,
      resizeTo: window,
    })
    document.body.appendChild(this.view)
  }
}