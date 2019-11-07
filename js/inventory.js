/**
 * @class Inventory
 */

class Inventory extends PIXI.Container {
  constructor (slotsCount) {
    super()
    for (let i = 0; i < slotsCount; i++) {
      let slotSquare = new InventorySlot()
      slotSquare.x = slotSquare.w * i
      this.addChild(slotSquare)
    }
  }

  addItem (item) {
    this.children[0].addItem(item)
  }
}

class InventorySlot extends PIXI.Graphics {
  constructor (size) {
    super()
    const SLOT_SIZE = size || 32
    this.w = SLOT_SIZE
    this.h = SLOT_SIZE

    this.items = []

    this.draw()
  }

  draw () {
    this.children.length = 0
    this.lineStyle(1, 0x00FF00)
    this.drawRect(0, 0, this.w, this.h)
    if (this.items.length > 0) {
      const item = this.items[0]
      item.pivot.x = item.width / 2
      item.pivot.y = item.height / 2

      item.x = this.w / 2
      item.y = this.h / 2

      this.addChild(this.items[0]) // TODO: make container, draw above
    }
    const text = new PIXI.Text(this.items.length, { fontSize: 16, fill: 0x00FF00 })
    this.addChild(text)
  }

  addItem (item) {
    if (this.items.length + 1 < (item.stackSize || 16)) {
      this.items.push(item)
    }
    this.draw()
  }

}