class Button {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = [255, 255, 255];
        this.hovered = false;
        this.clicked = false;
        this.display = true;
        this.text = "";
        this.image = null;

        this.clickfunc = () => {};
    }

    draw() {
        if (this.display) {
            if (this.hovered) {
                fill(200);
            } else {
                fill(...this.color);
            }
            rect(this.x, this.y, this.w, this.h);
            fill(0);
            textStyle(BOLD);
            text(this.text, this.x + this.w / 2, this.y + this.h / 2);

            if (this.image) {
                image(this.image, this.x, this.y, this.w, this.h);
            }
        }
    }

    setText(text) {
        this.text = text;
        return this;
    }

    setImage(image) {
        this.image = image;
        return this;
    }

    onClick(func) {
        this.clickfunc = func;
    }

    toggleDisplay() {
        this.display = !this.display;
    }

    mousePressed() {
        if (
            mouseX > this.x &&
            mouseX < this.x + this.w &&
            mouseY > this.y &&
            mouseY < this.y + this.h
        ) {
            this.clickfunc();
        }
    }
}
