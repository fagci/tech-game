import Entity from './entity'
import System from './system'
import * as PIXI from 'pixi.js'

export default class World {
  map: PIXI.Container
  private _entities: Entity[]
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

  addEntity(...entities: Entity[]): World {
    entities.forEach(entity => {
      this._entities.push(entity)
      // console.log(`[WORLD] + ${entity}`)
    })
    return this
  }

  removeEntity(...entities: Entity[]) {
    // console.log(`[WORLD] - ${entities}`)
    this._entities = this._entities.filter((i) => !entities.includes(i))

    return this
  }

  addSystem(system: System) {
    system.world = this
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