import System from '../ecs/system'

export default class Render extends System {
  update(dt) {
    this.world.entities.forEach(({RenderObject, Position}) => {
      if (RenderObject) {
        RenderObject.position.copyFrom(Position)
      }
    })
  }
}