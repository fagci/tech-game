export default class Entity {
  /**
   * Create an entity with components as arguments
   * @param {...Object} components Component classes
   * @description Can create entity with components at once
   */
  constructor(...components) {
    this._components = {}
    this.add(...components)
    this.uid = `${+new Date}_${(Math.random() * 100000) | 0}`
  }

  /**
   * @returns {Object[]}
   */
  get components() {
    return Object.values(this._components)
  }

  /**
   * @returns {string[]}
   */
  get componentNames() {
    return Object.keys(this._components)
  }

  add = (...components) => {
    components.forEach(c => {
      if (c instanceof Function) {
        c = new c
        console.warn(`Using default constructor for ${c.constructor.name}`)
      }
      this._components[c.constructor.name] = c
    })
    return this
  }

  remove = (...components) => {
    components.forEach(c => {
      delete this._components[c instanceof String ? c : c.constructor.name]
    })
    return this
  }

  get = (name) => {
    if (name instanceof Function) name = new name
    return this._components[name instanceof String ? name : name.constructor.name]
  }

  has = (name) => {
    if (name instanceof Function) name = new name
    return this._components[name instanceof String ? name : name.constructor.name] !== null
  }

  toString() {
    return `${this.constructor.name}.${this.uid}: [${this.componentNames}]`
  }
}
