import {Position, Velocity} from '../components'
import System from '../ecs/system'


export default class Physics extends System {
  groups() {
    return {
      moving: [Velocity, Position],
    }
  }

  update(delta, time) {
    super.update(delta, time)
    this.group.moving.forEach(entity => {

    })
  }
}