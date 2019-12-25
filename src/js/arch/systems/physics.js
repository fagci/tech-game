import System from '../ecs/system'

export default class Physics extends System {

  update(dt) {
    this.world.entities.forEach(entity => {
      // test for positioning
      const {Position, Moving} = entity
      if (Position && Moving) { // TODO: if is static, pass or remove entire Velocity component

        Moving.velocity.x += Moving.force.x / Moving.mass * dt

        Position.x += Moving.velocity.x
        Position.y += Moving.velocity.y
      }
    })
  }
}