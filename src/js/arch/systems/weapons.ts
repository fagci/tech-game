import System from '../ecs/system'
import Entity from '../ecs/entity'
import * as Components from '../components/components'

export default class Weapons extends System {
  ot: number = +new Date

  update(dt: number): void {
    this.world.entities.forEach(entity => {
      if (entity.LifeTime) { // TODO: на самом деле это дальность полёта снаряда
        entity.LifeTime.value += window.app.ticker.elapsedMS
        if (entity.LifeTime.value >= entity.LifeTime.maxValue) {
          this.world.removeEntity(entity)
          entity.destroy()
          return
        }
      }

      if (+new Date > this.ot + 1000) { // TODO: attach to weapon props
        this.ot = +new Date
        const {Slots} = entity
        if (Slots) {
          const {Armed} = entity.Slots.items[0]
          if (Armed && Armed.weapon.capacity > 0) {
            Armed.weapon.capacity--
            const bullet = Entity.create('Bullet', this.world.map)
            bullet.addComponent(new Components.Moving({velocity: {x: 1, y: 0}}))
            bullet.RenderObject.rotation = -Math.PI / 2
            bullet.Position.copyFrom(entity.Position)
            // bullet.RenderObject.addChild(new PIXI.Graphics().drawCircle(0,0,10))
            this.world.addEntity(bullet)
            // console.log(`Shoot with ${bullet}`, bullet)
          }
        }
      }
    })
  }
}