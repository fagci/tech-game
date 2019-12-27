import World from './world' // TODO: remove this (move entity manager to world?)
import * as Components from './components'

export default class EntityManager {
  world: World

  constructor(world: World) {
    this.world = world
  }

  createEntity(name: string) {
    const entityComponentsData = window.app.entities[name]
    const entity = World.createEntity()

    entityComponentsData.forEach((componentName: { [x: string]: {}; } | string) => {
      let name: string
      let options = null

      if (typeof componentName === 'object') {
        name = Object.keys(componentName)[0]
        options = componentName[name]
      } else if (typeof componentName === 'string') {
        name = componentName
      }

      const Component: typeof Components = (<any>Components)[name]
      if (Component === undefined) {
        console.warn(`Component [${name}] not defined.`)
        return
      }

      const component: typeof Components = new (<any>Component)(options)

      if (component instanceof Components.RenderObject) {
        this.world.map.addChild(component)
        console.info(`Entity with RenderObject component added to map`)
      }

      entity.add(component)
    })
    return entity
  }

  createBullet() {
    return this.createEntity('Bullet')
  }
}