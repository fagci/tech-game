import Entity from './entity'
import System from './system'
import * as PIXI from 'pixi.js'
import * as Components from '../components'

export default class World {
  _entities: any[]
  _systems: any[]
  map: any

  constructor(map: PIXI.Container) {
    this._entities = []
    this._systems = []
    this.map = map
  }

  addEntity(...entities: typeof Entity[]): World {
    entities.forEach(entity => {
      this._entities.push(entity)
    })
    return this
  }

  /**
   *
   * @param {...Entity} entities
   * @returns {World}
   */
  removeEntity(...entities: typeof Entity[]) {
    let i = entities.length
    while (i--) {
      if (this._entities.indexOf(this._entities[i]) !== -1) {
        const removedEntity = this._entities.splice(i, 1)
        console.log(`Removed entity ${removedEntity[0]}`)
      }
    }
    return this
  }

  addSystem(system: typeof System[]) {
    this._systems.push(system)
    return this
  }

  removeSystem(system: typeof System) {
    this._systems.splice(this._systems.indexOf(system), 1)
    return this
  }

  /**
   *
   * @param {...Object} components
   * @return {Entity}
   */
  static createEntity(...components: typeof Components[]) {
    return new Entity(...components)
  }

  get entities() {
    return this._entities
  }

  update(delta: number, time: number) {
    this._systems.forEach(system => system.update(delta, time))
  }

  toString() {
    return JSON.stringify(this.entities.map(e => e.toString()), null, 2)
  }
}