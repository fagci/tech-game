import System from '../ecs/system'
import {distance} from '../../utils/geometry'

export default class Energy extends System {
  update(dt: number) {
    const energySources = this.world.entities.filter(({EnergyGenerator, EnergyTransponder}) => {
      return !!EnergyGenerator || !!EnergyTransponder
    })
    this.world.entities.forEach(entity => {
      const {EnergyTransponder, EnergyGenerator} = entity.components
      if (EnergyGenerator) {
        EnergyGenerator.generate()
      }

      if (EnergyTransponder) {
        energySources.forEach(source => {
          if (source._uid === entity._uid) return
          const {EnergyGenerator: Generator, EnergyTransponder: Transponder} = source
          const distanceToSource = distance(entity.Position, source.Position)
          if (Generator && Generator.range <= distanceToSource) {
            EnergyTransponder.takeFrom(Generator, 0.1)
          }

          if (Transponder && Transponder.range <= distanceToSource) {
            EnergyTransponder.takeFrom(Transponder, 0.1)
          }
        })
      }
    })
  }
}