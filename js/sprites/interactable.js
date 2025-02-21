class Interactable {
    constructor(jr) {
        // Box is x, y, width, height

        this.x = 0;
        this.y = 0;

        this.box = null;
        this.image = "";
        this.hoveredImage = "";
        this.jr = jr;

        this.init();
    }

    init() {}
    update(dt) {}

    draw() {
        if (this.isHovered()) {
            image(images[this.hoveredImage], this.x, this.y);
        } else {
            image(images[this.image], this.x, this.y);
        }
    }

    isHovered() {
        if (!this.box) {
            return false;
        }

        let [x, y, w, h] = this.box;

        return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
    }

    isReached() {
        if (!this.box) {
            return false;
        }

        let [x, y, w, h] = this.box;

        return (
            this.jr.x >= x &&
            this.jr.x <= x + w &&
            this.jr.y >= y &&
            this.jr.y <= y + h
        );
    }

    setBox(x, y, w, h) {
        this.box = [
            x * canvasWidth,
            y * canvasHeight,
            w * canvasWidth,
            h * canvasHeight
        ];
    }
}
