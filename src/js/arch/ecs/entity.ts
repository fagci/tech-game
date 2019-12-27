import * as Components from './components'

export default class Entity {
  private readonly _uid: string
  private readonly _components: { [name: string]: typeof Components } = {}

  /**
   * Create an entity with components as arguments
   * @description Can create entity with components at once
   */
  constructor(...components: typeof Components[]) {
    this._uid = `${+new Date}_${(Math.random() * 100000) | 0}`
    this.add(...components)
  }

  get components(): typeof Components[] {
    return Object.values(this)
  }

  get componentNames(): string[] {
    return Object.keys(this).filter(k => this.hasOwnProperty(k))
  }

  add = (...components: typeof Components[]) => {
    components.forEach(component => {
      const name = component.constructor.name

      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: true,
        get: () => {
          return Reflect.get(this._components, component.constructor.name)
        },
      })

      this.set(name, component)
    })
    return this
  }

  remove = (...components: object[]) => {
    components.forEach(component => {
      const componentName = Entity.getComponentName(component)
      delete this._components[componentName]
    })
    return this
  }

  static getComponentName(component: string | object): string {
    return typeof component === 'string' ? component : component.constructor.name
  }

  toString() {
    return `${this.constructor.name}.${this._uid}: [${this.componentNames}]`
  }

  private set(name: string, component: typeof Components): Entity {
    this._components[name] = component
    return this
  }
}
