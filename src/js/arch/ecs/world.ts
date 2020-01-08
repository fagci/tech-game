import Entity from './entity'
import System from './system'
import * as PIXI from 'pixi.js'

export default class World {
  map: PIXI.Container
  private _entities: Map<number, Entity>
  private _systems: System[]

  constructor(mapName: string, map: PIXI.Container) {
    this._entities = new Map()
    this._systems = []
    this.map = map

    const mapEntitiesData = window.app.maps[mapName].entities

    mapEntitiesData.forEach((entityDefinition: { [x: string]: {}; } | string) => {
      this.addEntity(Entity.create(entityDefinition, this.map))
    })
  }

  addEntity(...entities: Entity[]): World {
    entities.forEach(entity => {
      this._entities.set(entity._uid, entity)
      // console.log(`[WORLD] + ${entity}`)
    })
    return this
  }

  removeEntity(entity: Entity) {
    // console.log(`[WORLD] - ${entities}`)
    this._entities.delete(entity._uid)
    return this
  }

  destroyEntity(entity: Entity) {
    this.removeEntity(entity)
    entity.destroy()
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
    this._systems.forEach(system => {
      console.timeStamp(`Update system ${system.constructor.name} begin`)
      system.update(dt)
      console.timeStamp(`Update system ${system.constructor.name} end`)
    })
  }

  toString() {
    return JSON.stringify(this.entities.map(e => e.toString()), null, 2)
  }
}