import System from '../ecs/system'
import {limitVector, pointDirection} from '../../utils/geometry'
import * as Components from '../components/components'
import * as PIXI from 'pixi.js'

export default class Movement extends System {
  update(dt: number) {
    this.world.entities.forEach(entity => {
      let Position: Components.Position, Moving: Components.Moving
      ({Position, Moving} = entity.components)
      if (Position && Moving) { // TODO: if is static, pass or remove entire Velocity component
        Moving.velocity.x += Moving.force.x * dt / Moving.mass
        Moving.velocity.y += Moving.force.y * dt / Moving.mass

        Moving.velocity = limitVector(Moving.velocity, Moving.maxVelocity)

        Position.x += Moving.velocity.x
        Position.y += Moving.velocity.y

        Moving.direction = pointDirection(new PIXI.Point(0, 0), Moving.velocity)
      }
    })
  }
}