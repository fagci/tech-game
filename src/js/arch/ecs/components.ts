import * as PIXI from 'pixi.js'
import Component from './component'

export class Health implements Component {
  MAX_HEALTH: number
  health: number


  constructor(maxHealth: number, health: number) {
    this.MAX_HEALTH = maxHealth || 100
    this.health = health || maxHealth
  }

}

export class Position extends PIXI.Point implements Component {

  constructor(options?: {}) {
    super()
    if (options) Object.assign(this, options)
  }
}

export class Damage implements Component {
  value: number

  constructor(value?: number) {
    this.value = value || 100
  }
}

export class Moving implements Component {
  mass: number
  force: PIXI.IPoint
  velocity: PIXI.IPoint
  maxVelocity: number

  constructor(options?: {}) {
    this.mass = 1
    this.force = new PIXI.Point(0, 0)
    this.velocity = new PIXI.Point(0, 0)
    this.maxVelocity = 12 // TODO: needed?
    if (options) Object.assign(this, options)
  }
}

export class Dissolve implements Component {
  dissolveTime: number
  dissolveTimeMax: any

  constructor(period?: {}) {
    this.dissolveTime = 0
    this.dissolveTimeMax = period || 5
  }
}

export class RenderObject extends PIXI.Container implements Component {
  texture: string
  sprite: PIXI.Sprite

  constructor(options?: {}) {
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

export class Energy implements Component {
  totalCapacity: number
  capacity: number

  constructor(totalCapacity?: number, capacity?: number) {
    this.totalCapacity = totalCapacity || 100
    this.capacity = capacity || 100
  }
}

export class EnergyGenerator extends Energy implements Component {
  powerSource: PowerSourceType

  constructor(maxPowerStorage?: number, powerStorageLevel?: number) {
    super(maxPowerStorage, powerStorageLevel)
    this.powerSource = PowerSourceType.THERMAL
  }
}

export class EnergyTransponder implements Component {
  source: Energy

  constructor(source: Energy) {
    this.source = source
  }
}

export class Debug implements Component {

  constructor() {

  }
}

export type ComponentMap = {
  Health?: Health
  Position?: Position
  Damage?: Damage
  Moving?: Moving
  Dissolve?: Dissolve
  RenderObject?: RenderObject
  Energy?: Energy
  EnergyGenerator?: EnergyGenerator
  EnergyTransponder?: EnergyTransponder
  Debug?: Debug
}

export type ComponentNames = keyof ComponentMap