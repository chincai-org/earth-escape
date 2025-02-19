class Cave extends Scene {
    init() {
        this.jr = new Alien(100, 100);
    }

    update(dt) {
        this.jr.update(dt);
    }

    mousePressed() {
        this.jr.travelTo(mouseX, mouseY);
    }

    draw() {
        this.jr.draw();
    }
}
