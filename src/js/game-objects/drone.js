import GameObject from "./game-object"
import * as PIXI from "pixi.js"

export class Drone extends GameObject {
  constructor() {
    super()

    this.phase = 0;

    // const g = new PIXI.Graphics()
    // g.lineStyle(3, 0x222222)
    // g.beginFill(0xee6600, 0.24)
    // g.moveTo(0, 0)
    // g.lineTo(30, 15)
    // g.lineTo(0, 30)
    // g.endFill()
    // this.addChild(g)

    this.g = new PIXI.Sprite(window.app.textures.plane)
    this.g.anchor.set(0.5,0.5)
    this.addChild(this.g)
  }

  static getDirectionAngle(anchor, point) {
    return Math.atan2(anchor.y - point.y, anchor.x - point.x) + Math.PI;
  }

  update(time) {
    const r = 150
    this.phase += time * 0.02;
    const x = Math.cos(this.phase) * r + 4096
    const y = Math.sin(this.phase) * r + 4096

    const oldPosition = new PIXI.Point()
    const newPosition = new PIXI.Point(x, y)

    this.position.copyTo(oldPosition)
    this.position.copyFrom(newPosition)

    this.rotation = Drone.getDirectionAngle(oldPosition, newPosition) + Math.PI/2
  }
}