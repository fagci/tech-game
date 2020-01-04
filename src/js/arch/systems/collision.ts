import System from '../ecs/system'
import * as Components from '../components/components'
import {boxIntersects} from '../../utils/geometry'

export default class Collision extends System {
  update(dt: number): void {
    this.world.entities.forEach(entity => {
      let Position: Components.Position, DamageSource: Components.DamageSource
      ({Position, DamageSource} = entity)
      if (Position && DamageSource) { // bullet
        this.world.entities.forEach(entityToCheck => {
          if (entity._uid === entityToCheck._uid) return
          if (entityToCheck._uid === DamageSource.from._uid) return

          let Health: Components.Health, RenderObject: Components.RenderObject
          ({Health, RenderObject} = entityToCheck)

          if (!Health) return

          if (entity.RenderObject && boxIntersects(RenderObject.sprite.getBounds(true), entity.RenderObject.sprite.getBounds(true))) {
            const damage = new Components.Damage({
              from: entity,
              to: entityToCheck,
              value: DamageSource.value,
            })
            entityToCheck.addComponent(damage)
            this.world.removeEntity(entity)
            entity.destroy()
          }

        })
      }
    })
  }
}