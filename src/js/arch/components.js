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
    this.force = force || 0.05
    this.direction = direction || 0.3
    this.update()
  }

  update() {
    const x = Math.cos(this.direction) * this.force
    const y = Math.sin(this.direction) * this.force
    this.acceleration = new PIXI.Point(x, y)
  }

  // FIXME:
  // скорее всего это отдельная сущность,
  // т.к. сие должно обрабатываться системой физики
  // как взаимодействие сущностей (прибавление вектора тяги двигателя).
}


export class Moving {
  constructor(options) {
    this.mass = 1
    this.force = new PIXI.Point(0, 0)
    this.velocity = new PIXI.Point(0, 0)
    this.maxSpeed = 12 // TODO: needed?
    if (options) Object.assign(this, options)
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