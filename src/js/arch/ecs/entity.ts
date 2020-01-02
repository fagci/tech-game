import Component, {ComponentType} from './component'
import * as Components from '../components/components'

export default class Entity {

  static __uid: number = 0
  _uid: number
  _name: string

  /**
   * Create an entity with components as arguments
   * @description Can create entity with components at once
   */
  constructor(name: string, ...components: ComponentType<Component>[]) {
    this._uid = ++Entity.__uid
    this._name = name
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
    return `<${this._name}#${this._uid}: ${this.componentNames}>`
  }

  private setComponent(name: string, component: any): Entity {
    this._components[name] = component
    return this
  }

  private getComponent(name: string) {
    return this._components[name]
  }

  static create(entityDefinition: { [x: string]: {}; } | string, parentRenderContainer?: PIXI.Container) {
    let eName: string
    let eOptions = null

    if (typeof entityDefinition === 'object') {
      eName = Object.keys(entityDefinition)[0]
      eOptions = entityDefinition[eName]
      Object.assign(eOptions, window.app.entities[eName]) // TODO: make deep copy or merge in iteration cycle
    } else if (typeof entityDefinition === 'string') {
      eName = entityDefinition
      eOptions = window.app.entities[entityDefinition]
    }
    const entity = new Entity(eName)
    if (eOptions === undefined) {
      console.error(`Entity with name "${eName}" is not described`)
      return entity
    }

    for (const [name, options] of Object.entries(eOptions)) {
      const Component: ComponentType<Component> = (<any>Components)[name]
      if (Component === undefined) {
        console.warn(`Component <${name}> not defined.`)
        continue
      }

      const component: ComponentType<Component> = new (<any>Component)(options)

      if (component instanceof Components.RenderObject && parentRenderContainer) {
        parentRenderContainer.addChild(component)
        console.info(`[Render] <${eName}>`)
      }

      if (component instanceof Components.Slots) {
        options?.items?.forEach((item, key, items) => {
          items[key] = Entity.create(item, entity.RenderObject ? entity.RenderObject : null)
        })
      }

      entity.addComponent(component)
    }
    return entity
  }

}