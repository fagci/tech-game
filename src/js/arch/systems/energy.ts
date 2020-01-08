import System from '../ecs/system'
import {distance} from '../../utils/geometry'

export default class Energy extends System {
  update(dt: number) {
    const energySources = new Map()
    for (const [id, entity] of this.entities) {
      let {EnergyGenerator, EnergyTransponder, EnergyConsumer} = entity
      if(EnergyGenerator || EnergyTransponder || EnergyConsumer) {
        energySources.set(id, entity)
      }
    }

    for (const [id, entity] of this.entities) {
      if (entity.Dead) continue
      const {EnergyTransponder, EnergyGenerator, EnergyConsumer} = entity.components
      if (!EnergyTransponder && !EnergyGenerator && !EnergyConsumer) continue

      if (EnergyGenerator) {
        EnergyGenerator.generate()
      }

      if (EnergyTransponder) {
        for (const [sourceId, source] of energySources) {
          if (sourceId === id) continue

          const {
            EnergyGenerator: Generator,
            EnergyTransponder: Transponder,
            EnergyConsumer: Consumer,
          } = source

          const distanceToSource = distance(entity.Position, source.Position)

          if (Generator && distanceToSource <= Generator.range) {
            EnergyTransponder.takeFrom(Generator)
          }

          if (Transponder && distanceToSource <= Transponder.range) {
            EnergyTransponder.takeFrom(Transponder)
          }

          if (Consumer && distanceToSource <= EnergyTransponder.range) {
            Consumer.takeFrom(EnergyTransponder)
          }
        }
      }

      if (EnergyConsumer) {
        EnergyConsumer.consume() // TODO: пустить энергию в нужное русло =)
      }
    }
  }
}