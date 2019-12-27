import World from './world'

export default class System {
  world: World

  constructor(world: World) {
    this.world = world
    world.addEntity()
  }

  /**
   * @method
   * @name System#update
   * @param {number} dt
   */
}