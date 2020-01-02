import Entity from './entity'
import System from './system'
import * as PIXI from 'pixi.js'
import * as Components from '../components/components'

export default class World {
  map: PIXI.Container
  private readonly _entities: Entity[]
  private _systems: System[]

  constructor(mapName: string, map: PIXI.Container) {
    this._entities = []
    this._systems = []
    this.map = map

    const mapEntitiesData = window.app.maps[mapName].entities

    mapEntitiesData.forEach((entityDefinition: { [x: string]: {}; } | string) => {
      this.addEntity(Entity.create(entityDefinition, this.map))
    })
  }

  static createEntity(name: string, ...components: typeof Components[]): Entity {
    return new Entity(name, ...components)
  }

  addEntity(...entities: Entity[]): World {
    entities.forEach(entity => {
      this._entities.push(entity)
    })
    return this
  }

  removeEntity(...entities: Entity[]) {
    let i = entities.length
    while (i--) {
      if (this._entities.indexOf(this._entities[i]) !== -1) {
        const removedEntity = this._entities.splice(i, 1)
        console.log(`Removed entity ${removedEntity[0]}`)
      }
    }
    return this
  }

  addSystem(system: System) {
    this._systems.push(system)
    return this
  }

  removeSystem(system: System) {
    this._systems.splice(this._systems.indexOf(system), 1)
    return this
  }

  get entities() {
    return this._entities
  }

  update(dt: number) {
    this._systems.forEach(system => system.update(dt))
  }

  toString() {
    return JSON.stringify(this.entities.map(e => e.toString()), null, 2)
  }
}