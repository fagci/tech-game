import World from './world' // TODO: remove this (move entity manager to world?)
import * as Components from '../components/components'
import Component, {ComponentType} from './component'

export default class EntityManager {
  world: World
  static world: any

  static setWorld(world: World) {
    this.world = world
  }

  static createEntity(entityName: string, parentRenderContainer?: PIXI.Container) {
    const entityComponentsData = window.app.entities[entityName]
    const entity = World.createEntity(entityName)
    if (entityComponentsData === undefined) {
      console.error(`Entity with name "${entityName}" is not described`)
      return entity
    }

    entityComponentsData.forEach((componentName: { [x: string]: {}; } | string) => {
      let name: string
      let options = null

      if (typeof componentName === 'object') {
        name = Object.keys(componentName)[0]
        options = componentName[name]
      } else if (typeof componentName === 'string') {
        name = componentName
      }

      const Component: ComponentType<Component> = (<any>Components)[name]
      if (Component === undefined) {
        console.warn(`Component <${name}> not defined.`)
        return
      }

      const component: ComponentType<Component> = new (<any>Component)(options)

      if (component instanceof Components.RenderObject) {
        (parentRenderContainer ? parentRenderContainer : this.world.map).addChild(component)
        console.info(`[Render] <${entityName}>`)
      }

      if (component instanceof Components.Slots) {
        options?.items?.forEach((item, key, items) => {
          items[key] = EntityManager.createEntity(item, entity.RenderObject ? entity.RenderObject : null)
        })
      }

      entity.addComponent(component)
    })
    return entity
  }
}