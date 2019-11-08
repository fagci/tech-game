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
    const SLOT_SIZE = size || 48
    this.w = SLOT_SIZE
    this.h = SLOT_SIZE

    this.items = []

    this.draw()
  }

  draw () {
    this.children.length = 0
    this.lineStyle(1, 0x1D313B)
    this.beginFill(0x253B45)
    this.drawRect(0, 0, this.w, this.h)
    this.endFill()
    if (this.items.length > 0 && !this.itemSprite) {
      let item = this.items[0]
      this.itemSprite = item

      item.anchor.set(.5)

      item.x = this.w / 2
      item.y = this.h / 2

      item.interactive = true

      // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
      item.buttonMode = true

      function onDragStart (event) {
        this.data = event.data
        this.alpha = 0.5
        this.dragging = true
      }

      function onDragEnd () {
        this.alpha = 1
        this.dragging = false
        this.data = null
      }

      function onDragMove () {
        if (this.dragging) {
          let newPosition = this.data.getLocalPosition(this.parent)
          this.position.x = newPosition.x
          this.position.y = newPosition.y
        }
      }

      item
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove)

      this.addChild(item) // TODO: make container, draw above
    }
    const text = new PIXI.Text(this.items.length, { fontSize: 16, fill: 0xFFFFFF })
    this.addChild(text)
  }

  addItem (item) {
    if (this.items.length + 1 < (item.stackSize || 16)) {
      this.items.push(item)
    }
    this.draw()
  }

}