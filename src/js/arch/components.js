import * as PIXI from 'pixi.js'

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

export class Material {
  constructor() {

  }
}

export class Position {
  constructor(point) {
    this.position = point || new PIXI.Point()
  }
}


export class Ballistic {
  constructor() {
    this.DAMAGE = 1200
    this.MAX_SPEED = 12

    this.direction = direction
    this.speed = 0
    this.lifeTime = 0
    this.lifeTimeMax = 4
    this.acceleration = 0.5
  }
}