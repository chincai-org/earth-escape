class Scene {
    constructor() {
        this.init();

        this.ui = [];
    }

    init() {}
    update() {}
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
