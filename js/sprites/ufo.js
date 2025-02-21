class Ufo extends Interactable {
    init() {
        this.image = "ufo_img";
        this.hoveredImage = "ufo_hovered_img";
        // this.box = [102, 360, 506, 314];

        this.setBox(
            0.05411255411255411,
            0.3162162162162162,
            0.2712842712842713,
            0.31756756756756754
        );
    }

    update() {
        if (this.isReached()) {
            transition(1);
            return true;
        }
    }
}
