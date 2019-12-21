import * as PIXI from 'pixi.js'

/**
 * @property {PIXI.Container} skyLayer
 * @property {PIXI.Container} entitiesLayer
 * @property {PIXI.Container} groundLayer
 * @property {PIXI.Container} undergroundLayer
 */
export default class GameMap extends PIXI.Container {
  constructor () {
    super()

    this.skyLayer = new PIXI.Container()
    this.entitiesLayer = new PIXI.Container()
    this.groundLayer = new PIXI.Container()
    this.undergroundLayer = new PIXI.Container()

    this.addChild(this.undergroundLayer)
    this.addChild(this.groundLayer)
    this.addChild(this.entitiesLayer)
    this.addChild(this.skyLayer)
  }

  update = (time) => {
    this.entitiesLayer.children.forEach(go => go.update && go.update(time))
  }
}