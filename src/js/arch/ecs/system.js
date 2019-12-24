import World from './world'

export default class System {
  /**
   * @param {World} world
   */
  constructor(world) {
    this.world = world
  }

  /**
   * @param {number} delta
   * @param {number} time
   */
  update(delta, time) {
  }
}