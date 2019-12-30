import Component, {ComponentType} from './component'

export default class Entity {

  _uid: string

  /**
   * Create an entity with components as arguments
   * @description Can create entity with components at once
   */
  constructor(...components: ComponentType<Component>[]) {
    this._uid = `${+new Date}_${(Math.random() * 100000) | 0}`
    components.forEach(component => this.addComponent(component))
  }

  _components: { [name: string]: any } = {}

  get components() {
    return this._components
  }

  get componentNames(): string[] {
    return Object.keys(this._components)
  }

  addComponent<T extends Component>(component: ComponentType<T>): Entity {
    const name = component.constructor.name

    Object.defineProperty(this, name, {
      configurable: true,
      enumerable: true,
      get: () => this.getComponent(name),
    })

    this.setComponent(name, component)
    return this
  }

  toString() {
    return `${this.constructor.name}.${this._uid}: [${this.componentNames}]`
  }

  private setComponent(name: string, component: any): Entity {
    this._components[name] = component
    console.info(`Components[${name}]=`, component)
    return this
  }

  private getComponent(name: string) {
    return this._components[name]
  }
}