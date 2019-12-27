import * as PIXI from 'pixi.js'

class Component {
  name: string

  constructor() {
    this.name = this.constructor.name
  }
}

export class Health {
  MAX_HEALTH: number
  health: number

  constructor(maxHealth: number, health: number) {
    this.MAX_HEALTH = maxHealth || 100
    this.health = health || maxHealth
  }
}

export class Position extends PIXI.Point {
  constructor(options: {}) {
    super()
    if (options) Object.assign(this, options)
  }
}

export class Damage {
  value: number

  constructor(value: number) {
    this.value = value || 100
  }
}

export class Moving {
  mass: number
  force: PIXI.Point
  velocity: PIXI.Point
  maxVelocity: number

  constructor(options: {}) {
    this.mass = 1
    this.force = new PIXI.Point(0, 0)
    this.velocity = new PIXI.Point(0, 0)
    this.maxVelocity = 12 // TODO: needed?
    if (options) Object.assign(this, options)
  }
}

export class Dissolve {
  dissolveTime: number
  dissolveTimeMax: any

  constructor(period: {}) {
    this.dissolveTime = 0
    this.dissolveTimeMax = period || 5
  }
}

export class RenderObject extends PIXI.Container {
  texture: string
  sprite: PIXI.Sprite

  constructor(options: {}) {
    super()
    const g = new PIXI.Graphics()
      .lineStyle(1, 0x0000ff, 1, 0)
      .drawCircle(0, 0, 10)
    this.addChild(g)

    this.texture = 'bricks'


    if (options) Object.assign(this, options)

    this.sprite = new PIXI.Sprite(window.app.textures[this.texture])
    this.addChild(this.sprite)
    this.sprite.anchor.set(0.5, 0.5)
  }
}

enum PowerSourceType {
  AIR,
  THERMAL,
  MECHANICAL,
  FUEL,
}

export class Energy {
  totalCapacity: number
  capacity: number

  constructor(totalCapacity: number, capacity: number) {
    this.totalCapacity = totalCapacity || 100
    this.capacity = capacity || 100
  }
}

export class EnergyGenerator extends Energy {
  powerSource: PowerSourceType

  constructor(maxPowerStorage: number, powerStorageLevel: number) {
    super(maxPowerStorage, powerStorageLevel)
    this.powerSource = PowerSourceType.THERMAL
  }
}

export class EnergyRetranslator {
  source: Energy

  constructor(source: Energy) {
    this.source = source
  }
}

// export class Debug {
//   constructor() {
//
//   }
// }