import System from '../ecs/system'

export default class Energy extends System {
  update(dt) {
    this.world.entities.forEach(entity => {
      if (entity.EnergyRetranslator) {
        if (entity.EnergyRetranslator.source && entity.Energy.capacity < entity.EnergyRetranslator.source.capacity) {
          entity.Energy.capacity += 10
          entity.EnergyRetranslator.source.capacity -= 10
        }
      }
    })
  }
}