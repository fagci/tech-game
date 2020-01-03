import System from '../ecs/system'

export default class Render extends System {
  update(dt: number) {
    this.world.entities.forEach(({RenderObject, Position, Moving, Debug}) => {
      if (RenderObject && Position) {
        RenderObject.position.copyFrom(Position)
      }
      if (RenderObject && Moving) {
        RenderObject.rotation = Moving.direction
      }

      if (Debug) {
        Debug.update(dt)
      }
    })
  }
}