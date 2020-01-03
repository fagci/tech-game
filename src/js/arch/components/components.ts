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
  from: Entity

  constructor(value?: number) {
    this.value = value || 100
  }
}

export class Moving implements Component {
  mass: number
  force: PIXI.IPoint
  velocity: PIXI.IPoint
  direction: number = 0
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
    const texture = window.app.textures[this.texture]
    if (!texture) {
      console.warn(`Texture "${this.texture}" not exists`)
    }
    this.sprite = new PIXI.Sprite(texture)
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
  places: Array<string> = []

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

export class Team implements Component {
  value: number = Teams.ALPHA

  constructor(value: any) {
    this.value = typeof value === 'string' ? Teams[value] : value
  }
}

const Weapons = {
  MACHINE_GUN: {
    roundCapacity: 50,
    initialCapacity: 250,
    reloadTime: 5000,
    damage: 12,
    fireDelay: 200,
  },
}

export class Weapon implements Component {
  capacity: number = 0
  lastFire: number = 0

  constructor(options: {}) {
    if (options) Object.assign(this, options)
    this.capacity = this.initialCapacity || 0
  }
}

export class Armed implements Component {
  type: string = 'NONE'
  weapon: Weapon

  constructor(options: {}) {
    if (options) Object.assign(this, options)
    this.weapon = new Weapon(Weapons[this.type])
  }
}

export class LifeTime implements Component {
  maxValue: number = 10000
  value: number = 0

  constructor(options: {}) {
    if (options) Object.assign(this, options)
  }
}

export class Factory implements Component {

  constructor(options: {}) {
    if (options) Object.assign(this, options)
  }
}

export class Selectable implements Component {
  selected: boolean = false
  color: number = 0xff0000

  constructor(options: {}) {
    if (options) Object.assign(this, options)
  }
}


export class Debug implements Component {
  attributes: Array<string> = null
  entity: Entity
  debugInfo: PIXI.Container
  debugText: PIXI.Text
  debugTextTemplate: string

  constructor(options: {}) {

    if (options) Object.assign(this, options)

    if (this.attributes || this.debugTextTemplate) {
      this.debugInfo = new PIXI.Container()

      this.debugText = new PIXI.Text('', {fontSize: 9, fontFamily: 'monospace'})
      this.debugText.roundPixels = true

      this.debugInfo.addChild(this.debugText)
    }

    if (this.attributes) {
      // TODO compose text template string
      this.debugTextTemplate = ''
      this.attributes.forEach((attributeName) => {
        this.debugTextTemplate += attributeName + ': ${JSON.stringify(this.entity.' + attributeName + ',null,2)}\n'
      })
    }
  }

  static interpolate(templateString: string, templateVars: {}) {
    return new Function('return `' + templateString + '`;').call(templateVars)
  }

  update(dt: number) {
    this.debugText.rotation = -this.entity.RenderObject.rotation
    this.debugText.text = Debug.interpolate(this.debugTextTemplate, this)
  }
}