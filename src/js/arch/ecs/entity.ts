import Component, {ComponentType} from './component'
import * as Components from '../components/components'
import {Health, RenderObject, Slots} from '../components/components'

export default class Entity {

  static __uid: number = 0
  _uid: number
  _name: string

  readonly [key: string]: any

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
    let entityName: string
    let entityOptions = null

    if (typeof entityDefinition === 'object') {
      entityName = Object.keys(entityDefinition)[0]
      entityOptions = window.app.entities[entityName] || {}
      const mapComponentOptions = entityDefinition[entityName]
      const componentNames = [...Object.keys(entityOptions), ...Object.keys(mapComponentOptions)]

      for (const componentName of componentNames) {
        entityOptions[componentName] = {...entityOptions[componentName], ...mapComponentOptions[componentName] || {}}
      }

    } else if (typeof entityDefinition === 'string') {
      entityName = entityDefinition
      entityOptions = window.app.entities[entityName]
    }
    const entity = new Entity(entityName)
    if (entityOptions === undefined) {
      console.error(`Entity with name "${entityName}" is not described`)
      return entity
    }

    for (const [componentName, componentOptions] of Object.entries(entityOptions)) {
      const Component: ComponentType<Component> = (<any>Components)[componentName]
      if (Component === undefined) {
        console.warn(`Component <${componentName}> not defined.`)
        continue
      }

      const component: ComponentType<Component> = new (<any>Component)(componentOptions)

      entity.addComponent(component)
    }

    let Slots: Slots, Health: Health, RenderObject: RenderObject
    ({Slots, Health, RenderObject} = entity)

    if (RenderObject) {
      parentRenderContainer.addChild(RenderObject)
      console.info(`[Render] <${entityName}>`)
    }

    if (Slots) {
      Slots?.items?.forEach((item: any, key: number, items: any) => {
        items[key] = Entity.create(item, entity.RenderObject)
      })
    }

    if (Health && RenderObject) {
      Health.enableIndication()
      Health.lifeIndicator.position.y = -(RenderObject.getBounds().height / 2 + Health.lifeIndicator.height)
      RenderObject.addChild(Health.lifeIndicator)
    }

    return entity
  }

}