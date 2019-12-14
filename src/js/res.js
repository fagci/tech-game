import * as PIXI from 'pixi.js'

export default class Res extends PIXI.Loader {
  constructor () {
    super()
    this.add('sheet', 'assets/ss.json')
  }
}