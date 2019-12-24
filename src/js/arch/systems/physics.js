import {Position, Velocity} from '../components'
import System from '../ecs/system'


export default class Physics extends System {

  update(delta, time) {
    super.update(delta, time)
    this.world.entities.forEach(entity => {

    })
  }
}