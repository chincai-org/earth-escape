class Door extends Interactable {
    init() {
        this.transitionDestination = -1;
    }

    setTransition(transitionDestination) {
        this.transitionDestination = transitionDestination;
        return this;
    }

    setGoDirection(x, y) {
        this.goDirection = { x, y };
        return this;
    }

    update() {
        if (this.isReached() && !effect.active) {
            console.log("oh");
            transition(this.transitionDestination, 2, 2);
            return true;
        }
    }
}
