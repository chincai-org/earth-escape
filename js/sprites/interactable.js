class Interactable {
    constructor(box, image, hoveredImage, jr) {
        // Box is x, y, width, height

        this.x = 0;
        this.y = 0;

        this.box = box;
        this.image = image;
        this.hoveredImage = hoveredImage;
        this.jr = jr;
    }

    draw() {
        if (this.isHovered()) {
            image(this.hoveredImage, this.x, this.y);
        } else {
            image(this.image, this.x, this.y);
        }
    }

    isHovered() {
        let [x, y, w, h] = this.box;

        return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
    }
}
