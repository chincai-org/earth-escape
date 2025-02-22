class Door extends Interactable {
    init() {
        this.transitionDestination = -1;
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

    update() {
        if (this.isReached()) {
            transition(this.transitionDestination);
            return true;
        }
    }
}
