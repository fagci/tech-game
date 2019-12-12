class StateManager extends Array {
  top () {
    return this.length ? this[this.length - 1] : null
  }

  update () {
    const state = this.top()
    if (state) {
      state.update()
    }
  };

  render () {
    const state = this.top()
    if (state) {
      state.render()
    }
  };

  push (state) {
    super.push(state)
    state.onEnter()
  };

  pop () {
    const state = this.top()
    state.onExit()
    return super.pop()
  };

  pause () {
    const state = this.top()
    if (state.onPause) {
      state.onPause()
    }
  };

  resume () {
    const state = this.top()
    if (state.onResume) {
      state.onResume()
    }
  };
}
