class Controls {
  constructor () {
    this._keyDown = {}
    this._mouseDown = {}
    this._isMouseDown = false
    this._mouseX = undefined
    this._mouseY = undefined
    this._dx = 0
    this._dy = 0

    window.addEventListener('keydown', e => this._keyDown[e.which] = true)
    window.addEventListener('keyup', e => this._keyDown[e.which] = null)

    window.addEventListener('mousedown', this.mouseDown)
    window.addEventListener('mouseup', this.mouseUp)

    window.addEventListener('touchstart', this.mouseDown)
    window.addEventListener('touchend', this.mouseUp)

    window.addEventListener('mousemove', this.mouseMove)
    window.addEventListener('touchmove', this.mouseMove)
  }

  getKeyDown = (key) => {
    if (key instanceof Array) {
      return key.filter(e => this._keyDown[e]).length
    }

    return !!this._keyDown[key]
  }

  mouseDown = (e) => {
    this._mouseX = e.touches ? e.touches[0].pageX : e.clientX
    this._mouseY = e.touches ? e.touches[0].pageY : e.clientY

    this._mouseDown[e.which] = true
    this._isMouseDown = true
  }

  mouseUp = (e) => {
    this._mouseDown[e.which] = null
    this._isMouseDown = false
  }

  mouseMove = (e) => {
    let posX = e.touches ? e.touches[0].pageX : e.clientX
    let posY = e.touches ? e.touches[0].pageY : e.clientY

    if (!this._isMouseDown) return

    let deltaX = posX - this._mouseX
    let deltaY = posY - this._mouseY

    this._mouseX = posX
    this._mouseY = posY

    const event = new Event('drag')
    event.dx = deltaX
    event.dy = deltaY
    window.dispatchEvent(event)
  }
}