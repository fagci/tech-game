import Entity from './entity'

export default class World {
  constructor(map) {
    this._entities = []
    this._systems = []
    this.map = map
  }

  /**
   *
   * @param {...Entity} entities
   * @returns {World}
   */
  addEntity(...entities) {
    entities.forEach(entity => {
      this._entities.push(entity)
    })
    return this
  }

  /**
   *
   * @param {...Entity} entities
   * @returns {World}
   */
  removeEntity(...entities) {
    let i = entities.length
    while (i--) {
      if (this._entities.indexOf(this._entities[i]) !== -1) {
        const removedEntity = this._entities.splice(i, 1)
        console.log(`Removed entity ${removedEntity[0]}`)
      }
    }
    return this
  }

  addSystem(system) {
    this._systems.push(system)
    return this
  }

  removeSystem(system) {
    this._systems.splice(this._systems.indexOf(system), 1)
    return this
  }

  /**
   *
   * @param {...Object} components
   * @return {Entity}
   */
  static createEntity(...components) {
    return new Entity(...components)
  }

  get entities() {
    return this._entities
  }

  update(delta, time) {
    this._systems.forEach(system => system.update(delta, time))
  }

  toString() {
    return JSON.stringify(this.entities.map(e => e.toString()), null, 2)
  }
}