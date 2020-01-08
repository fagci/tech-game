import World from './world'

export interface ISystem {
  update(dt: number): void;
}

export default class System implements ISystem {
  world: World

  update(dt: number): void {
  }

  get entities () {
    return this.world.entities
  }
}