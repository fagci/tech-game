export default class System {

  /**
   * @typedef {import(./world.js)} World
   * @param {World} world
   */
  constructor(world) {
    this.world = world
    world.addEntity()
  }

  /**
   * @method
   * @name System#update
   * @param {number} dt
   */
}