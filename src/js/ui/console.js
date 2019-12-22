import * as PIXI from 'pixi.js'

export default class Console extends PIXI.Container {
  constructor() {
    super()

    this.counter = 0
    this.PADDING = 8
    this.MAX_WIDTH = 200

    this.levels = {
      LOW: 5000,
      URGENT: 60000,
    }

    this.messages = []

    this.msgContainer = new PIXI.Container()

    this.consoleBg = new PIXI.Graphics()

    this.addChild(this.consoleBg)
    this.addChild(this.msgContainer)
    this.updateConsoleBg()
  }

  updateConsoleBg() {
    this.consoleBg.clear()
    if (this.messages.length === 0) {
      this.consoleBg.drawRect(0, 0, this.MAX_WIDTH, 1)
      return
    }
    this.consoleBg.beginFill(0x253B45, 0.75)
    this.consoleBg.drawRect(0, 0, this.MAX_WIDTH, this.msgContainer.height + this.PADDING)
    this.consoleBg.endFill()
  }

  refreshMessages(removedMessages) { // TODO: remove messages and realign
    this.msgContainer.removeChildren()
    this.messages.forEach(msg => {
      const msgName = `msg_${msg.id}`
      if (!this.msgContainer.getChildByName(msgName)) {
        const text = `${msg.time.toLocaleString()}\n${msg.text}`
        const message = new PIXI.Text(text, {
          fill: 0xffffff,
          fontSize: 12,
          padding: 4,
          wordWrapWidth: this.MAX_WIDTH - this.PADDING * 2,
          wordWrap: true,
        })
        message.name = msgName
        message.position.x = this.PADDING
        message.position.y = this.msgContainer.height + this.PADDING
        this.msgContainer.addChild(message)
      }
    })
    this.updateConsoleBg()
  }

  addMessage(text, level) {
    const id = this.counter++
    level = level || this.levels.LOW
    const time = new Date()
    this.messages.push({
      id, text, level, time, removeAt: +time + level,
    })
    this.refreshMessages()
  }

  update(delta) {
    const nowTimestamp = +new Date()
    let i = this.messages.length
    const removedMessages = []
    while (i--) {
      let msg = this.messages[i]
      if (msg.removeAt < nowTimestamp) {
        removedMessages.push(this.messages.splice(i, 1))
      }
    }
    if (removedMessages.length) this.refreshMessages(removedMessages)
  };

}