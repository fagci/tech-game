window.PIXI = require('pixi.js')
import App from './app'
import Game from './game'

PIXI.utils.skipHello()
window.app = new App()

const game = new Game()
window.app.stage.addChild(game)

game.start()