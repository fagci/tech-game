import App from './app'
import Game from './game'
import * as PIXI from 'pixi.js'

PIXI.utils.skipHello()
window.app = new App()

const game = new Game()
window.app.stage.addChild(game)

game.start()