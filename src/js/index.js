import App from './app'
import Game from './game'

const app = new App()
window.app = app
const game = new Game(app)
app.stage.addChild(game)
game.start()