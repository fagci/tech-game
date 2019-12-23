export default class World {
  constructor() {
    this._groups = {}
  }

  /**
   * @returns {Object[]}
   */
  get groups() {
    return Object.values(this._groups)
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

  toString() {
    return JSON.stringify(this._groups, null, 2)
  }
}