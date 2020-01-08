import Entity from './entity'
import System from './system'
import * as PIXI from 'pixi.js'

export default class World {
  
  map: PIXI.Container
  private _systems: System[] = []
  private _entities: Map<number, Entity> = new Map()
  private _componentEntities: Map<string, Map<number, Entity>> = new Map()

  constructor(mapName: string, map: PIXI.Container) {
    this.map = map

    const mapEntitiesData = window.app.maps[mapName].entities

    mapEntitiesData.forEach((entityDefinition: { [x: string]: {}; } | string) => {
      this.addEntity(Entity.create(entityDefinition, this.map, this))
    })
  }

  createEntity(entityDefinition: string | { [x: string]: {} }) {
    return Entity.create(entityDefinition, null, this)
  }

  getEntitiesWith(componentName: string) {
    if(!this._componentEntities.has(componentName)) {
      this._componentEntities.set(componentName, new Map())
    }
    return this._componentEntities.get(componentName)
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

  addEntityComponent(entity: Entity, componentName: string) {
    if(!this._componentEntities.has(componentName)) {
      this._componentEntities.set(componentName, new Map())
    }
    this._componentEntities.get(componentName).set(entity._uid, entity)
  }

  removeEntityComponent(entity: Entity, componentName: string) {
    this._componentEntities.get(componentName).delete(entity._uid)
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
    for(let system of this._systems) {
      console.timeStamp(`Update system ${system.constructor.name} begin`)
      system.update(dt)
      console.timeStamp(`Update system ${system.constructor.name} end`)
    }
  }

  toString() {
    return JSON.stringify(this.entities.map(e => e.toString()), null, 2)
  }
}