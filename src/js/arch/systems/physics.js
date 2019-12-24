import System from '../ecs/system'
import {limit} from '../../utils/geometry'


export default class Physics extends System {

  update(dt) {
    this.world.entities.forEach(entity => {
      // test for positioning
      const {Position, Velocity, VelocityConstraint, Engine} = entity
      if (Position && Velocity) {
        if (Engine) {
          Engine.direction += 0.2
          Engine.update()
          Velocity.x += Engine.acceleration.x
          Velocity.y += Engine.acceleration.y
        }
        if (VelocityConstraint) {
          Velocity.x = limit(Velocity.x, VelocityConstraint.value)
          Velocity.y = limit(Velocity.y, VelocityConstraint.value)
        }
        Position.x += Velocity.x * dt
        Position.y += Velocity.y * dt
      }
    })
  }
}