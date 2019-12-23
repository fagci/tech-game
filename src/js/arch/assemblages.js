import Entity from './entity'
import * as Components from './components'

export class Enemy extends Entity {
  constructor() {
    super()
    this.addComponent(new Components.Health(1000))
  }
}

export class Bullet extends Entity {
  constructor() {
    super()
    this.addComponent(new Components.Ballistic())
  }
}