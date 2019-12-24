import World from './world'

export default class System {
  /**
   * @param {World} world
   */
  constructor(world) {
    this.world = world
    this._filterGroups = {}
    this._isFilterGroupsNeedsUpdate = true
  }

  arrayIntersect(arrA, arrB) {
    return arrA.filter(x => arrB.includes(x))
  }

  update(delta, time) {
    if (this._isFilterGroupsNeedsUpdate && this.groups) {

      const groups = this.groups()
      for (let filterGroupName in groups) {
        if (!groups.hasOwnProperty(filterGroupName)) continue
        let filterGroupComponents = groups[filterGroupName]
        let firstComponentGroup = filterGroupComponents[0]
        if (firstComponentGroup instanceof Function) firstComponentGroup = new firstComponentGroup
        const firstComponentGroupName = firstComponentGroup instanceof String ? firstComponentGroup : firstComponentGroup.constructor.name

        console.log(`First component group name: ${firstComponentGroupName}`)

        this._filterGroups[filterGroupName] = this.world.groups[firstComponentGroupName]
        Object.values(this.world.groups).forEach(arrayOfEntities => {
          this._filterGroups[filterGroupName] = this.arrayIntersect(this._filterGroups[filterGroupName], arrayOfEntities)
        })
      }
      console.log(this.group) // TODO: geet 2 entities, but passed one.
      this._isFilterGroupsNeedsUpdate = false
    }
  }

  get group() {
    return this._filterGroups
  }

  // TODO: implement filter for groups
}