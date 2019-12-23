import {World} from 'ecsy'
import {Damage, Dissolve, Engine, Mass, Position, Velocity, VelocityConstraint} from './components'

export default class EntityFactory {
  /**
   * @param {World} world
   */
  constructor(world) {
    this.world = world
  }

  createBullet() {
    return this.world
      .createEntity()
      .addComponent(Position)
      .addComponent(Engine)
      .addComponent(Mass)
      .addComponent(Velocity)
      .addComponent(VelocityConstraint)
      .addComponent(Dissolve)
      .addComponent(Damage)
  }
}