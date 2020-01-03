import System from '../ecs/system'
import * as Components from '../components/components'
import {boxIntersects} from '../../utils/geometry'

export default class Collision extends System {
  update(dt: number): void {
    this.world.entities.forEach(entity => {
      let Position: Components.Position, Damage: Components.Damage
      ({Position, Damage} = entity)
      if (Position && Damage) {
        this.world.entities.forEach(entityToCheck => {
          if (entity._uid === entityToCheck._uid) return
          if (Damage.from._uid === entityToCheck._uid) return
          if (Damage.from._uid === entity._uid) return

          let Health: Components.Health, RenderObject: Components.RenderObject
          ({Health, RenderObject} = entityToCheck)
          if (entity.RenderObject && Health && boxIntersects(RenderObject.sprite.getBounds(true), entity.RenderObject.sprite.getBounds(true))) {
            Health.takeDamage(Damage.value)
            this.world.removeEntity(entity)
            entity.destroy()
            if (Health.health <= 0) {
              this.world.removeEntity(entityToCheck)
              entityToCheck.destroy()
            }
          }

        })
      }
    })
  }
}