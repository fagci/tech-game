import Entity from './entity'

export default class World {
  constructor() {
    this._groups = {}
    this._systems = []
  }

  /**
   * @returns {Object.<string,Array>}
   */
  get groups() {
    return this._groups
  }

  /**
   * @returns {string[]}
   */
  get groupNames() {
    return Object.keys(this._groups)
  }

  /**
   *
   * @param {...Entity} entities
   * @returns {World}
   */
  add(...entities) {
    entities.forEach(entity => {
      entity.componentNames.forEach(componentName => {
        if (!this._groups[componentName]) {
          this._groups[componentName] = []
        }
        this._groups[componentName].push(entity)
      })
    })
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

  update(delta, time) {
    this._systems.forEach(system => system.update(delta, time))
  }

  createEntity(...components) {
    const entity = new Entity(...components)
    this.add(entity)
    return entity
  }

  toString() {
    return JSON.stringify(this._groups, null, 2)
  }
}