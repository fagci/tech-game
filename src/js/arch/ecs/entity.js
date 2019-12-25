export default class Entity {
  /**
   * Create an entity with components as arguments
   * @param {...Object} components Component classes
   * @description Can create entity with components at once
   */
  constructor(...components) {
    // this._components = {}
    Object.defineProperty(this, '_components', {enumerable: false, value: {}})
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
    return Object.keys(this._components).filter(k => this.hasOwnProperty(k))
  }

  add = (...components) => {
    components.forEach(c => {
      let name = c.constructor.name
      if (c instanceof Function) {
        c = new c
        name = c.constructor.name
        console.warn(`Using default constructor for ${name}`)
      }

      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: true,
        get: () => {
          return Reflect.get(this._components, c.constructor.name)
        },
      })

      this._components[name] = c
    })
    return this
  }

  remove = (...components) => {
    components.forEach(c => {
      delete this._components[Entity.getComponentName(name)]
    })
    return this
  }

  get = (name) => {
    return this._components[Entity.getComponentName(name)]
  }

  has = (name) => {
    return this._components[Entity.getComponentName(name)] !== null
  }

  static getComponentName(component) {
    if (component instanceof Function) component = new component
    return component instanceof String ? component : component.constructor.name
  }

  toString() {
    return `${this.constructor.name}.${this.uid}: [${this.componentNames}]`
  }
}
