import World from './ecs/world'
import * as Components from './components'

export default class EntityFactory {
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
      if (typeof componentName === 'string') {
        entity.add(new Components[componentName])
        return
      }
      const key = Object.keys(componentName)[0]
      const options = componentName[key]
      entity.add(new Components[key](options))
    })
    return entity
  }

  createBullet() {
    return this.createEntity('Bullet')
  }
}