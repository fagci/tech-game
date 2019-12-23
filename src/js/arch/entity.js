import Material from './material'
import Component from './component'

/**
 * @property {GameObject} gameObject
 * @property {Object.<string,Component>} components
 */
export default class Entity {
  constructor(name) {
    this.name = name || this.constructor.name
    this.material = Material.AIR
    this.position = null

    this.components = {}
  }

  /**
   * Add component to entity
   * @param {typeof Component} component
   * @return {Entity} to chain component addition, etc
   */
  addComponent(component) {
    this.components[component.name] = component
    return this
  }

  /**
   * Remove component from entity by name or component instance
   * @param {string|Component} nameOrComponent
   * @return {Entity}
   */
  removeComponent(nameOrComponent) {
    if (nameOrComponent instanceof Component) {
      nameOrComponent = nameOrComponent.name
    }
    delete this.components[nameOrComponent]
    return this
  }

  /**
   * Get component from entity
   * @param name
   * @returns {Component}
   */
  getComponent(name) {
    return this.components[name]
  }

  /**
   * To get information about object, log it
   * @return {string}
   */
  toString() {
    return JSON.stringify(this, null, 4)
  }
}