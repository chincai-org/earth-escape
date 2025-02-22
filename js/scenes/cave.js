class Cave extends Scene {
    init() {
        this.jr = new Alien(100, 100);
        this.ufo = new Door(this.jr);
        this.ufo
            .setImages("ufo_img", "ufo_hovered_img")
            .setTransition(7)
            .setBox(
                0.05411255411255411, // hard coded values go brrr
                0.3162162162162162,
                0.2712842712842713,
                0.31756756756756754
            );

        this.interactables.push(this.ufo);
    }

    lateUpdate() {
        if (this.ufo.update()) {
            this.jr.stopTravel();
        }
    }

    update(dt) {
        this.jr.update(dt);
    }

    mousePressed() {
        this.jr.travelTo(mouseX, mouseY);
    }

    draw() {
        image(images.cave_bg, 0, 0, canvasWidth, canvasHeight);
        this.jr.draw();
        super.draw();
    }

    transition() {
        this.jr.x = 100;
        this.jr.y = 100;
    }
}
