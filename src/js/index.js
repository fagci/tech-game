import App from './app'
import Game from './game'

window.app = new App()

const game = new Game()
app.stage.addChild(game)

game.start()