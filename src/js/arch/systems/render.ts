import System from '../ecs/system'

export default class Render extends System {
  update(dt: number) {
    this.world.entities.forEach(({RenderObject, Position}) => {
      if (RenderObject && Position) {
        RenderObject.position.copyFrom(Position)
      }
    })
  }
}