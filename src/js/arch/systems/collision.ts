import System from '../ecs/system'
import * as Components from '../components/components'
import {boxIntersects} from '../../utils/geometry'

export default class Collision extends System {
  update(dt: number): void {
    this.world.entities.forEach(entity => {
      if (!entity.Solid) return
      let Position: Components.Position, DamageSource: Components.DamageSource
      ({Position, DamageSource} = entity)
      if (Position && DamageSource) { // bullet
        this.world.entities.forEach(entityToCheck => {
          if (entity._uid === entityToCheck._uid) return
          if (entityToCheck._uid === DamageSource.from._uid) return

          let Health: Components.Health, RenderObject: Components.RenderObject, Solid: Components.Solid
          ({Health, Solid, RenderObject} = entityToCheck)

          if (!Health || !Solid) return

          if (entity.RenderObject && boxIntersects(RenderObject.sprite.getBounds(true), entity.RenderObject.sprite.getBounds(true))) {
            entityToCheck.addComponent(new Components.Damage({
              from: entity,
              to: entityToCheck,
              value: DamageSource.value,
            }))
            this.world.removeEntity(entity)
            entity.destroy()
          }

        })
      }
    })
  }
}