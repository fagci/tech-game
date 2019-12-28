// import {EntityComponentsHolder} from './components'

type ComponentsType = typeof import('./components')
type ComponentTypeSymbols = keyof ComponentsType
type EntityComponentsHolder = {
  [T in ComponentTypeSymbols]?: ComponentsType[T]
}

type EntityComponentsContainer = {
  _uid: string
  _components: EntityComponentsHolder
} & EntityComponentsHolder

export default class Entity implements EntityComponentsContainer {

  _uid: string
  _components: EntityComponentsHolder

  /**
   * Create an entity with components as arguments
   * @description Can create entity with components at once
   */
  constructor(...components: ComponentsType[]) {
    this._components = {}
    this._uid = `${+new Date}_${(Math.random() * 100000) | 0}`
    this.add(...components)
  }

  get componentNames(): string[] {
    return Object.keys(this._components).filter(k => this.hasOwnProperty(k))
  }

  static getComponentName(component: ComponentsType): ComponentTypeSymbols {
    return <ComponentTypeSymbols>component.constructor.name
  }

  add = (...components: ComponentsType[]) => {
    components.forEach(component => {
      const name: keyof ComponentsType = <keyof ComponentsType>component.constructor.name

      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: true,
        get: () => {
          return this.get(name)
        },
      })

      this.set(name, component)
    })
    return this
  }

  remove = (...components: ComponentsType[]) => {
    components.forEach(component => {
      const componentName = Entity.getComponentName(component)
      delete this._components[componentName]
    })
    return this
  }


  toString() {
    return `${this.constructor.name}.${this._uid}: [${this.componentNames}]`
  }

  private set(name: ComponentTypeSymbols, component: object): Entity {
    // @ts-ignore
    this._components[name] = component
    return this
  }

  private get(name: ComponentTypeSymbols) {
    return this._components[name]
  }
}