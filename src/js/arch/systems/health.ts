import System from '../ecs/system'
import {Dissolve} from '../components/components'

export default class Health extends System {
  update(dt: number): void {
    this.world.entities.forEach(entity => {
      const {Damage, Health} = entity
      if (Damage && Health) {
        Health.take(Damage)
        entity.removeComponent(Damage)
        if (Health.value <= 0) {
          entity.addComponent(new Dissolve({max: 5000}))
          if (entity.Solid) {
            entity.removeComponent(entity.Solid)
          }
          if (entity.Slots) {
            entity.removeComponent(entity.Slots)
          }
        }
      }
    })
  }
}