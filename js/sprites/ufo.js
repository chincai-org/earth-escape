class Ufo extends Interactable {
    init() {
        this.image = "ufo_img";
        this.hoveredImage = "ufo_hovered_img";
        // this.box = [102, 360, 506, 314];

        this.setBox(
            0.09595959595959595,
            0.4837837837837838,
            0.3463203463203463,
            0.4243243243243243
        );
    }

    update() {
        if (this.isReached()) {
            transition(1);
            return true;
        }
    }
}
