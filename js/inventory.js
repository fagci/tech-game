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

      item.pivot.set(item.width/2, item.height/2)

      item.x = this.w / 2
      item.y = this.h / 2

      item.interactive = true

      // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
      item.buttonMode = true


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

class InventoryItem extends PIXI.Graphics {
  constructor () {
    super()

    this.lineStyle(1, 0x00ff00)
    this.beginFill(0x0)
    this.drawRect(0, 0, 32, 32)
    this.endFill()

    this.text = new PIXI.Text('', { fontSize: 8, fill: 0x00FF00 })
    this.addChild(this.text)

    this.on('added', function() {
      this.text.text = `${this.position.x | 0},${this.position.y | 0}\n${this.name}`
    })
  }
}