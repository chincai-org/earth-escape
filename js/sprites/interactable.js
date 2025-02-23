class Interactable {
    constructor(jr) {
        // Box is x, y, width, height

        this.x = 0;
        this.y = 0;

        this.box = null;
        this.image = "";
        this.hoveredImage = "";
        this.jr = jr;

        this.display = true;
        this.goDirection = { x: -1, y: -1 };

        this.init();

        this.startFlying = false;
        this.flySpeed = 0.1;
        this.flyHeight = 50;
        this.flyY = 0;
    }

    init() {}
    update(dt) {
        if (this.startFlying) {
            this.flyY += this.flySpeed * dt;
            if (this.flyY >= this.flyHeight) {
                this.flyY = this.flyHeight;
                this.startFlying = false;
                this.display = false;
                // tipsManager.deactivate();
            }
        }
    }

    draw() {
        if (this.flyY != 0) console.log(this.flyY);
        if (!this.display) {
            return;
        }

        if (this.image == "" || this.hoveredImage == "") {
            // return;
            // console.log("not images");
        }

        if (this.box && debug) {
            let [x, y, w, h] = this.box;
            noFill();
            stroke(135, 206, 235);
            strokeWeight(2);
            rect(x, y, w, h);
        }

        if (this.isHovered()) {
            if (this.hoveredImage.length) {
                image(
                    images[this.hoveredImage],
                    this.x,
                    this.y - this.flyY,
                    canvasWidth,
                    canvasHeight
                );
            }
        } else {
            if (this.image.length) {
                image(
                    images[this.image],
                    this.x,
                    this.y,
                    canvasWidth,
                    canvasHeight
                );
            }
        }
    }

    isHovered() {
        if (!this.box || dialougeManager.active || this.jr.isTravelling()) {
            return false;
        }

        let [x, y, w, h] = this.box;

        return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
    }

    isReached(target = null) {
        if (!this.box) {
            return false;
        }

        target = target || this.jr;

        let [x, y, w, h] = this.box;

        return (
            target.x >= x &&
            target.x <= x + w &&
            target.y >= y &&
            target.y <= y + h
        );
    }

    setBox(x, y, w, h) {
        this.box = [
            x * canvasWidth,
            y * canvasHeight,
            w * canvasWidth,
            h * canvasHeight
        ];

        return this;
    }

    setImages(image = "", hoveredImage = null) {
        this.image = image;
        this.hoveredImage = hoveredImage || image;
        return this;
    }

    displayNone() {
        this.display = false;
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

    equals(other) {
        // compare box
        if (this.box.length != other.box.length) {
            return false;
        }

        for (let i = 0; i < this.box.length; i++) {
            if (this.box[i] != other.box[i]) {
                return false;
            }
        }

        // compare image
        if (this.image != other.image) {
            return false;
        }

        // compare hoveredImage
        if (this.hoveredImage != other.hoveredImage) {
            return false;
        }

        return true;
    }
}
