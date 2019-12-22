import * as PIXI from 'pixi.js'
import GameObject from './game-object'
import {pointDirection} from '../utils/geometry'
import Ballistic from './ballistic'

import * as particles from 'pixi-particles'

export class Drone extends GameObject {
  constructor() {
    super()

    this.phase = 0
    this.fireRate = 2
    this.timeSpent = 0

    this.elapsed = Date.now()

    this.engine = new PIXI.Container()
    this.engine.position.y = 16
    this.addChild(this.engine)

    this.emitter = new particles.Emitter(
      this.engine,
      [app.textures.cover_red],
      {
        'alpha': {
          'start': 0.75,
          'end': 0,
        },
        'scale': {
          'start': 0.125,
          'end': 0.175,
        },
        'color': {
          'start': 'ffffff',
          'end': '888888',
        },
        'speed': {
          'start': 500,
          'end': 500,
        },
        'startRotation': {
          'min': 88,
          'max': 92,
        },
        'rotationSpeed': {
          'min': 50,
          'max': 50,
        },
        'lifetime': {
          'min': 0.01,
          'max': 0.075,
        },
        'blendMode': 'normal',
        'frequency': 0.001,
        'emitterLifetime': 0,
        'maxParticles': 100,
        'pos': {
          'x': 0,
          'y': 0,
        },
        'addAtBack': false,
        'spawnType': 'rect',
        'spawnRect': {
          'x': -24,
          'y': 0,
          'w': 48,
          'h': 0,
        },

      },
    )


    this.g = new PIXI.Sprite(window.app.textures.plane)
    this.g.anchor.set(0.5, 0.5)
    this.addChild(this.g)
    this.on('added', w => {
      this.world = w
    })

  }

  update(time) {
// console.log(`Time spent: ${time}`)
    this.timeSpent += app.ticker.elapsedMS / 1000.0

    const now = Date.now()
    this.emitter.update((now - this.elapsed) * 0.001)
    this.elapsed = now

    if (this.timeSpent > this.fireRate) {
      this.timeSpent = 0
      this.fire()
    }

    const r = 150
    this.phase += time * 0.02
    this.phase %= Math.PI * 2
    const x = Math.cos(this.phase) * r + 4096
    const y = Math.sin(this.phase) * r + 4096

    const oldPosition = new PIXI.Point()
    const newPosition = new PIXI.Point(x, y)

    this.position.copyTo(oldPosition)
    this.position.copyFrom(newPosition)

    this.rotation = pointDirection(oldPosition, newPosition) + Math.PI / 2
  }

  fire() {
    const target = new PIXI.Point(4096, 4096)
    const rocket = new Ballistic(this.position, pointDirection(this.position, target))
    this.world.addChild(rocket)
  }
}