import System from '../ecs/system'

export default class Energy extends System {
  update(dt: number) {
    this.world.entities.forEach(entity => {
      const {EnergyTransponder, Energy} = entity.components
      if (EnergyTransponder) {
        if (EnergyTransponder.source && Energy.capacity < EnergyTransponder.source.capacity) {
          Energy.capacity += 10
          EnergyTransponder.source.capacity -= 10
        }
      }
    })
  }
}