class Door extends Interactable {
    init() {
        this.transitionDestination = -1;
        this.goDirection = { x: -1, y: -1 };
    }

    setImages(image = "", hoveredImage = null) {
        this.image = image;
        this.hoveredImage = hoveredImage || image;
        return this;
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
            return this.goDirection;
        }
    }

    update() {
        if (this.isReached()) {
            transition(this.transitionDestination);
            return true;
        }
    }
}
