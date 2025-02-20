class Ufo extends Interactable {
    init() {
        this.image = "ufo_img";
        this.hoveredImage = "ufo_img";
        this.box = [203, 263, 228, 161];
    }

    update() {
        if (this.isReached()) {
            transition(1);
            return true;
        }
    }
}
