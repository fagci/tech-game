/**
 * @class Inventory
 */

class Inventory extends PIXI.Container {
  constructor (slotsCount) {
    super()
    this.slots = {}
    this.slotsCount = slotsCount

    for (let i = 0; i < slotsCount; i++) {
      let slotSquare = new InventorySlot()
      slotSquare.x = slotSquare.w * i
      this.addChild(slotSquare)
    }
  }

  addItem (item) {
    const stackSize = item.getStackSize()
    const itemType = typeof item
    for (let i in this.slotsCount) {
      // TODO: move through all slots (by type) and add item if stack size not exceeded. Or place into empty slot if slot is available
    }
  }
}

class InventorySlot extends PIXI.Graphics {
  constructor (size) {
    super()
    const SLOT_SIZE = size || 32
    this.w = SLOT_SIZE
    this.h = SLOT_SIZE

    this.lineStyle(1,0x00FF00)
    this.drawRect(0,0,SLOT_SIZE,SLOT_SIZE)
  }
}