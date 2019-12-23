import {Position, Velocity} from '../components'
import System from '../ecs/system'


class Physics extends System {
  groups() {
    return {
      moving: [Velocity, Position],
    }
  }

  execute(delta, time) {
    this.group.moving.forEach(entity => {

    })
  }
}

export default Physics