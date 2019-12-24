import World from './ecs/world'
import {Damage, Dissolve, Engine, Mass, Position, RenderObject, Velocity, VelocityConstraint} from './components'

export default class EntityFactory {
  /**
   * @param {World} world
   */
  constructor(world) {
    this.world = world
  }

  createBullet() {
    return this.world.createEntity(RenderObject, Position, Engine, Mass, Velocity, VelocityConstraint, Dissolve, Damage)
  }
}