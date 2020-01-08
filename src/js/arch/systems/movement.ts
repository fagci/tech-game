import System from '../ecs/system'
import {limitVector, pointDirection} from '../../utils/geometry'
import * as Components from '../components/components'
import * as PIXI from 'pixi.js'

export default class Movement extends System {
  update(dt: number) {
    for (const [id, entity] of this.entities) {
      if (entity.Dead) continue
      let Position: Components.Position, Moving: Components.Moving
      ({Position, Moving} = entity.components)
      if (Position && Moving) { // TODO: if is static, pass or remove entire Velocity component
        let {force, velocity, mass, maxVelocity} = Moving
        velocity.x += force.x * dt / mass
        velocity.y += force.y * dt / mass
if(!velocity.copyFrom) {
  console.log(entity._name)
}
        velocity.copyFrom(limitVector(velocity, maxVelocity))

        Position.x += velocity.x
        Position.y += velocity.y

        Moving.direction = pointDirection(new PIXI.Point(0, 0), velocity)
      }
    }
  }
}