import System from "../ecs/system";
import Entity from "../ecs/entity";

import * as Components from '../components/components'

export default class Damage extends System {
  addDamage(from: Entity, to: Entity, by: Entity) {
    const damageParams = {
      from,
      to,
      value: by.DamageSource.value,
    }
    to.addComponent(new Components.Damage(damageParams))
    this.world.destroyEntity(by)
  }

  update(dt: number) {
    this.world.entities.forEach(from => {
      if(!from.Solid) return
      let collisions = from.Solid.collisions

      for(let toID in collisions){
        if(!from.DamageSource) continue
        let collisionTo = collisions[toID]
        if(!collisionTo) continue
        if(from.Team && collisionTo.Team && from.Team.value === collisionTo.Team.value) continue
        this.addDamage(from.DamageSource.from, collisionTo, from)
      }
    })
  }
}