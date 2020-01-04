import System from '../ecs/system'
import {Destroy} from '../components/components'

export default class Render extends System {
  update(dt: number) {
    this.world.entities.forEach(entity => {
      var {RenderObject, Position, Moving, Debug, Dissolve} = entity
      if (!RenderObject) return
      if (Position) {
        RenderObject.position.copyFrom(Position)
      }
      if (Moving) {
        RenderObject.rotation = Moving.direction
      }

      if (Debug) {
        Debug.update(dt)
      }

      if (Dissolve) {
        Dissolve.value -= window.app.ticker.elapsedMS
        if (Dissolve.value <= 0) {
          entity.removeComponent(Dissolve)
          entity.addComponent(new Destroy())
        } else {
          RenderObject.alpha = Dissolve.value / Dissolve.max
        }
      }
    })
  }
}