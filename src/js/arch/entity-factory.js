import World from './ecs/world'
import {Damage, Dissolve, Moving, Position, RenderObject} from './components'

export default class EntityFactory {
  /**
   * @param {World} world
   */
  constructor(world) {
    this.world = world
  }

  createBullet() {
    return this.world.createEntity(RenderObject, new Position(4096, 4096 - 50), Moving, Dissolve, Damage)
  }
}