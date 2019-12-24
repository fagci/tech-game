import * as PIXI from 'pixi.js'

/**
 * @property {string} name
 */
class Component {
  constructor() {
    this.name = this.constructor.name
  }
}

/**
 * Declares health properties
 * @class
 * @property {number} MAX_HEALTH
 * @property {number} health
 */
export class Health {
  constructor(maxHealth, health) {
    this.MAX_HEALTH = maxHealth || 100
    this.health = health || maxHealth
  }
}

export class Position {
  /**
   * Point desc test
   * @type {PIXI.Point}
   * @description Point!
   */
  position

  constructor(point) {
    this.position = point || new PIXI.Point()
  }
}

export class Velocity {
  constructor() {
    this.x = this.y = 0
  }
}

export class Damage {
  constructor(damage) {
    this.damage = damage || 100
  }
}

export class Engine {
  constructor(direction, force) {
    this.force = force || 0
    this.direction = direction
  }
}

export class Mass {
  constructor(mass) {
    this.mass = mass || 1
  }

}

export class VelocityConstraint {
  constructor(maxVelocity) {
    this.maxVelocity = maxVelocity || 12
  }
}

export class Friction {
  constructor() {

  }
}

export class Dissolve {
  constructor(period) {
    this.dissolveTime = 0
    this.dissolveTimeMax = period || 5
  }
}

export class RenderMaterial {
  constructor() {
    this.texture = null
  }
}

export class RenderObject extends PIXI.Container {
  constructor() {
    super()
    const g = new PIXI.Graphics()
      .lineStyle(1, 0x0000ff, 1, 0)
      .drawCircle(0, 0, 10)
    this.addChild(g)
  }
}
