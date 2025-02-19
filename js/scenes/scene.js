class Scene {
    constructor() {
        this.init();

        this.ui = [];
    }

    init() {}
    update(dt) {}
    lateUpdate() {}
    draw() {}
    mousePressed() {
        for (let ui of this.ui) {
            ui.mousePressed();
        }
    }
    mouseReleased() {
        for (let ui of this.ui) {
            ui.mouseReleased();
        }
    }
}
