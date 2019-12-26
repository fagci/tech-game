import World from './ecs/world'
import * as Components from './components'
import {RenderObject} from './components'

export default class EntityManager {
  /**
   * @param {World} world
   */
  constructor(world) {
    this.world = world
  }

  createEntity(name) {
    const entityComponentsData = app.entities[name]
    const entity = this.world.createEntity()

    entityComponentsData.forEach(componentName => {
      let name = componentName
      let options = null
      if (typeof componentName !== 'string') {
        name = Object.keys(componentName)[0]
        options = componentName[name]
      }
      const Component = Components[name]
      if (Component === undefined) {
        console.warn(`Component [${name}] not defined.`)
        return
      }

      const component = new Component(options)

      if (name === 'RenderObject') {
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