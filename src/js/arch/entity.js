import Material from './material'

/**
 * @property {GameObject} gameObject
 */
class Entity {
  constructor(name) {
    this.name = name
    this.material = Material.AIR
    this.position = null
  }
}