import System from '../ecs/system'
import Entity from '../ecs/entity'
import * as Components from '../components/components'
import {directionVector} from '../../utils/geometry'
import * as PIXI from 'pixi.js'

export default class Weapons extends System {
  update(dt: number): void {
    this.world.entities.forEach(entity => {
      let Slots: Components.Slots, Position: Components.Position, LifeTime: Components.LifeTime
      ({Slots, Position, LifeTime} = entity)
      if (LifeTime) { // TODO: на самом деле это дальность полёта снаряда
        LifeTime.value += window.app.ticker.elapsedMS
        if (LifeTime.value >= LifeTime.maxValue) {
          this.world.removeEntity(entity)
          entity.destroy()
          return
        }
      }

      if (Slots) {
        Slots.items.forEach(slotItem => {
          const {Armed} = slotItem
          slotItem.RenderObject.rotation += Math.PI / 180 * dt
          if (window.app.ticker.lastTime > Armed.weapon.lastFire + Armed.weapon.fireDelay) {
            Armed.weapon.lastFire = window.app.ticker.lastTime
            if (Armed && Armed.weapon.capacity > 0) {
              Armed.weapon.capacity--
              const bullet = Entity.create('Bullet', this.world.map)
              const velocityVector = directionVector(new PIXI.Point(), slotItem.RenderObject.rotation, 2)
              bullet.addComponent(new Components.Moving({velocity: velocityVector}))
              bullet.Position.copyFrom(Position)
              this.world.addEntity(bullet)
            }
          }
        })
      }
    })
  }
}