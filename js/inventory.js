/**
 * @class Inventory
 */

class Inventory {
  cinstructor (slotsCount) {
    this.slots = {}
    this.slotsCount = slotsCount
  }

  addItem(item) {
    const stackSize = item.getStackSize()
    const itemType = typeof item;
    for(let i in this.slotsCount) {
      // TODO: move through all slots (by type) and add item if stack size not exceeded. Or place into empty slot if slot is available
    }
  }
}