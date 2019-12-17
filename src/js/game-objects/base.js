import GameObject from './game-object'

export default class Base extends GameObject {
  constructor () {
    super()
    this.clear() // TODO: remove default graphics

    this.redraw()
    this.pivot.set(32, 32)
  }

  redraw () {
    this.lineStyle(1, this.selected ? 0xff0000 : 0, 1, 0)
    this.beginFill(0x882222)
    this.drawRect(0, 0, 64, 64)
    this.endFill()
  }
}