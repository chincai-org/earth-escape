class Door extends Interactable {
    init() {
        this.transitionDestination = -1;
        this.goDirection = { x: -1, y: -1 };
    }

    setTransition(transitionDestination) {
        this.transitionDestination = transitionDestination;
        return this;
    }

    setGoDirection(x, y) {
        this.goDirection = { x, y };
        return this;
    }

    getGoDirection() {
        if (this.goDirection.x === -1 && this.goDirection.y === -1) {
            return { x: mouseX, y: mouseY };
        } else {
            return {
                x: this.goDirection.x * canvasWidth,
                y: this.goDirection.y * canvasHeight
            };
        }
    }

    update() {
        if (this.isReached() && !effect.active) {
            transition(this.transitionDestination, 2, 2);
            return true;
        }
    }
}
