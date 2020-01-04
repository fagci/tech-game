import System from '../ecs/system'

export default class Destroy extends System {
  update(dt: number): void {
    this.world.entities.forEach(entity => {
      const {Destroy} = entity
      Destroy && this.world.destroyEntity(entity)
    })
  }
}