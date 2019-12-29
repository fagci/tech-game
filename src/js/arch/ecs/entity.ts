import Component, {ComponentType} from './component'
import {ComponentMap, ComponentNames} from './components'

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

  _components: ComponentMap = {}

  get components() {
    return this._components
  }

  get componentNames(): string[] {
    return Object.keys(this._components)
  }

  addComponent<T extends Component>(component: ComponentType<T>): Entity {
    const name = <ComponentNames>component.constructor.name

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

  private setComponent(name: ComponentNames, component: any): Entity {
    this._components[name] = component
    console.info(`Components[${name}]=`, component)
    return this
  }

  private getComponent(name: ComponentNames) {
    return this._components[name]
  }
}