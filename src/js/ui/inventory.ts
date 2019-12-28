import * as PIXI from 'pixi.js'

/**
 * @class Inventory
 */

export default class Inventory extends PIXI.Container {
  slots: PIXI.Container
  detailsView: PIXI.Container
  detailsViewBg: PIXI.Graphics
  detailsViewText: PIXI.Text

  constructor(slotsCount: number) {
    super()
    this.slots = new PIXI.Container()

    this.detailsView = new PIXI.Container()
    this.detailsViewBg = new PIXI.Graphics()
    this.detailsView.addChild(this.detailsViewBg)
    this.detailsViewText = new PIXI.Text('', {fontSize: 14, wordWrap: true, fill: 0xffffff})
    this.detailsView.addChild(this.detailsViewText)

    for (let i = 0; i < slotsCount; i++) {
      let slotSquare = new InventorySlot(this)
      slotSquare.x = slotSquare.w * i
      this.slots.addChild(slotSquare)
    }


    this.addChild(this.slots)
    this.addChild(this.detailsView)
  }

  addItem(item: InventoryItem) {
    const inventorySlot: any = this.slots.children[0]
    inventorySlot.addItem(item)
  }

  setDescription(text: string) {
    this.detailsViewText.text = text
    this.detailsViewText.style.wordWrapWidth = this.width
    const height = text ? this.detailsViewText.height : 0

    this.detailsViewBg
      .clear()
      .lineStyle(1, 0, 1, 0)
      .beginFill(0)
      .drawRect(0, 0, this.detailsViewText.width, height)
      .endFill()

    this.detailsView.pivot.set(0, height)
  }
}

export class InventorySlot extends PIXI.Graphics {
  inventory: Inventory
  w: number
  h: number
  items: InventoryItem[]
  text: PIXI.Text
  itemSprite: any

  constructor(inventory: Inventory, size?: number) {
    super()
    this.inventory = inventory
    this.w = this.h = size || 48

    this.items = []

    this.text = new PIXI.Text('', {fontSize: 16, fill: 0xFFFFFF})

    this.updateSlotGraphics()
  }

  updateSlotGraphics() {
    this.children.length = 0
    this
      .lineStyle(1, 0x1D313B, 1, 0)
      .beginFill(0x253B45)
      .drawRect(0, 0, this.w, this.h)
      .endFill()

    if (this.items.length > 0 && !this.itemSprite) {
      let item = this.items[0]
      this.itemSprite = item

      item.pivot.set(16, 16)

      item.x = this.w / 2
      item.y = this.h / 2

      item.interactive = true
      item.buttonMode = true

      item.on('pointerover', (e: any) => {
        const target = e.target
        if (target instanceof InventoryItem) {
          this.inventory.setDescription(target.description || null)
        }
      })

      item.on('pointerout', (e: any) => {
        this.inventory.setDescription(null)
      })

      this.addChild(item) // TODO: make container, draw above
      this.addChild(this.text)
      this.text.text = `${this.items.length}`
    }
  }

  addItem(item: InventoryItem) {
    if (this.items.length + 1 < (item.stackSize || 16)) {
      this.items.push(item)
    }
    this.updateSlotGraphics()
  }
}

export class InventoryItem extends PIXI.Graphics {
  stackSize: number
  description: string

  constructor() {
    super()

    this.description = 'Base inventory item. Does nothing.'

    this
      .lineStyle(1, 0x00ff00)
      .beginFill(0x0)
      .drawRect(0, 0, 32, 32)
      .endFill()
  }
}