class StateManager extends Array {
    /**
     * @param {Game} container
     */
    constructor(container) {
        super()
        this.container = container
    }

    top() {
        return this.length ? this[this.length - 1] : null
    }

    update() {
        const state = this.top()
        if (state) state.update()
    };

    render() {
        const state = this.top()
        if (state) state.render()
    };

    push(state) {
        console.log(`New state: ${state.constructor.name}`)
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
            // this.container.removeChildren()
        if (!state) return
        this.container.addChild(state)
    }
}