class Cave extends Scene {
    init() {
        this.jr = new Alien(100, 100);
        this.ufo = new Ufo(this.jr);
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
