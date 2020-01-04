import System from '../ecs/system'

export default class Health extends System {
  update(dt: number): void {
    this.world.entities.forEach(entity => {
      const {Damage, Health} = entity
      if (Damage && Health) {
        Health.takeDamage(Damage.value)
        entity.removeComponent(Damage)
        if (Health.value <= 0) {
          this.world.destroyEntity(entity)
        }
      }
    })
  }
}