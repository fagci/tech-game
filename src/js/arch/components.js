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

export class Position extends PIXI.Point {
  constructor(options) {
    super()
    if (options) Object.assign(this, options)
  }
}

export class Damage {
  constructor(value) {
    this.value = value || 100
  }
}

export class Moving {
  constructor(options) {
    this.mass = 1
    this.force = new PIXI.Point(0, 0)
    this.velocity = new PIXI.Point(0, 0)
    this.maxVelocity = 12 // TODO: needed?
    if (options) Object.assign(this, options)
  }
}

export class Dissolve {
  constructor(period) {
    this.dissolveTime = 0
    this.dissolveTimeMax = period || 5
  }
}

export class RenderObject extends PIXI.Container {
  constructor(options) {
    super()
    const g = new PIXI.Graphics()
      .lineStyle(1, 0x0000ff, 1, 0)
      .drawCircle(0, 0, 10)
    this.addChild(g)

    this.texture = 'bricks'


    if (options) Object.assign(this, options)

    this.sprite = new PIXI.Sprite(app.textures[this.texture])
    this.addChild(this.sprite)
    this.sprite.anchor.set(0.5, 0.5)

  }
}

/** @enum PowerSourceType */
const PowerSourceType = {
  AIR: Symbol('air'),
  THERMAL: Symbol('thermal'),
  MECHANICAL: Symbol('mechanical'),
  FUEL: Symbol('fuel'),
}

export class Energy {
  constructor(totalCapacity, capacity) {
    this.totalCapacity = totalCapacity || 100
    this.capacity = capacity || 100
  }
}

export class EnergyGenerator extends Energy {
  constructor(maxPowerStorage, powerStorageLevel) {
    super(maxPowerStorage, powerStorageLevel)
    this.powerSource = PowerSourceType.THERMAL
  }
}

export class EnergyRetranslator {
  /**
   *
   * @param {Energy} source
   */
  constructor(source) {
    this.source = source
  }
}

// export class Debug {
//   constructor() {
//
//   }
// }