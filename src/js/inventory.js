import * as PIXI from 'pixi.js'

/**
 * @class Inventory
 */

export default class Inventory extends PIXI.Container {
  constructor (slotsCount) {
    super()
    this.slots = new PIXI.Container()

    this.detailsView = new PIXI.Container()
    this.detailsViewText = new PIXI.Text('No description', { fontSize: 8, fill: 0xffffff })

    for (let i = 0; i < slotsCount; i++) {
      let slotSquare = new InventorySlot()
      slotSquare.x = slotSquare.w * i
      this.slots.addChild(slotSquare)
    }

    const detailsViewBg = new PIXI.Graphics()

    detailsViewBg.lineStyle(1, 0xff0000)
    detailsViewBg.beginFill(0x0000ff)
    detailsViewBg.drawRect(0, 0, this.slots.width, this.height)
    detailsViewBg.endFill()

    this.detailsViewBg = detailsViewBg

    this.detailsView.addChild(this.detailsViewBg)
    this.detailsView.addChild(this.detailsViewText)
    this.detailsView.pivot.set(0, this.detailsView.height)

    this.addChild(this.slots)
    this.addChild(this.detailsView)

    this.slots.on('click', e => {
      console.log(e.target)
      if (e.target instanceof InventoryItem) {
        this.detailsView.pivot.set(0, this.detailsView.height)
        this.detailsViewText.text = e.target.details
      }
    })
  }

  addItem (item) {
    this.slots.children[0].addItem(item)
  }
}

export class InventorySlot extends PIXI.Graphics {
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

      item.pivot.set(item.width / 2, item.height / 2)

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

export class InventoryItem extends PIXI.Graphics {
  constructor () {
    super()

    this.description = 'Base inventory item. Does nothing.'

    this.lineStyle(1, 0x00ff00)
    this.beginFill(0x0)
    this.drawRect(0, 0, 32, 32)
    this.endFill()

    this.text = new PIXI.Text('', { fontSize: 8, fill: 0x00FF00 })
    this.addChild(this.text)

    this.on('added', function () {
      this.text.text = `${this.position.x | 0},${this.position.y | 0}\n${this.name}`
    })
  }
}