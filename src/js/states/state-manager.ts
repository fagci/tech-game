import Game from '../game'

export default class StateManager extends Array {
  container: Game

  constructor(container: Game) {
    super()
    this.container = container
  }

  top() {
    return this.length ? this[this.length - 1] : null
  }

  update(time: number) {
    const state = this.top()
    if (state && state.update) state.update(time)
  };

  render() {
    const state = this.top()
    if (state) state.render()
  };

  push(state) {
    console.log(`[STATE] ${state.constructor.name}`)
    super.push(state)
    this.attachTopState()
    state.onEnter()
    return state
  };

  pop() {
    const state = this.top()
    if (!state) return null
    state.onExit()
    console.log(`Remove state: ${state.constructor.name}`)
    const oldState = super.pop()
    this.attachTopState()
    return oldState
  };

  pause() {
    const state = this.top()
    if (state.onPause) state.onPause()
  };

  resume() {
    const state = this.top()
    if (state.onResume) state.onResume()
  };

  attachTopState = () => {
    const state = this.top()
    if (!state) return
    this.container.children.forEach(ch => ch.destroy())
    this.container.addChild(state)
  }
}