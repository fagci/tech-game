import System from '../ecs/system'
import {distance} from '../../utils/geometry'

export default class Energy extends System {
  update(dt: number) {
    const energySources = this.world.entities.filter(({EnergyGenerator, EnergyTransponder, EnergyConsumer}) => {
      return !!EnergyGenerator || !!EnergyTransponder || !!EnergyConsumer
    })

    this.world.entities.forEach(entity => {
      if (entity.Dead) return
      const {EnergyTransponder, EnergyGenerator, EnergyConsumer} = entity.components
      if (!EnergyTransponder && !EnergyGenerator && !EnergyConsumer) return

      if (EnergyGenerator) {
        EnergyGenerator.generate()
      }

      if (EnergyTransponder) {
        energySources.forEach(source => {
          if (source._uid === entity._uid) return

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
        })
      }

      if (EnergyConsumer) {
        EnergyConsumer.consume() // TODO: пустить энергию в нужное русло =)
      }
    })
  }
}