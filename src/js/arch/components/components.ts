import * as PIXI from 'pixi.js'
import Component from '../ecs/component'
import Entity from '../ecs/entity'
import ProgressBar from '../../ui/progressbar'

export class Health implements Component {
  maxHealth: number = 100
  health: number = 100
  lifeIndicator: ProgressBar

  constructor(options: { maxHealth?: number, health?: number }) {
    if (options) Object.assign(this, options)
  }

  takeDamage(damage: number) {
    this.health -= damage
    if (this.health < 0) this.health = 0
    if (this.lifeIndicator) this.lifeIndicator.setProgress(this.health)
  }

  enableIndication() {
    this.lifeIndicator = new ProgressBar(32, 4, this.maxHealth, this.health)
  }

  disableIndication() {
    this.lifeIndicator.destroy()
    this.lifeIndicator = null
  }

  destroy() {
    this.lifeIndicator && this.lifeIndicator.destroy()
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
  texture: string = 'bricks'
  sprite: PIXI.Sprite

  constructor(options?: {}) {
    super()

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

export class Slots {
  items: Array<Entity> = []

  constructor(options: { items: [] }) {
    if (options) Object.assign(this, options)
  }
}

export enum Teams {
  ALPHA,
  BETA,
  GAMMA,
  THETA
}

export class Team {
  value: number = Teams.ALPHA

  constructor(value: any) {
    this.value = typeof value === 'string' ? Teams[value] : value
  }
}

export class Debug implements Component {
  constructor() {

  }
}