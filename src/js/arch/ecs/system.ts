import World from './world'

export interface ISystem {
  update(dt: number): void;
}

export default class System implements ISystem {
  world: World

  constructor(world: World) {
    this.world = world
    world.addEntity()
  }

  update(dt: number): void {
  }
}