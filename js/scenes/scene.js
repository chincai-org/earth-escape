class Scene {
    constructor() {
        this.ui = [];
        this.interactables = [];

        this.init();
    }

    init() {}
    update(dt) {}
    lateUpdate() {}
    draw() {
        for (let ui of this.ui) {
            ui.draw();
        }
        for (let interactable of this.interactables) {
            interactable.draw();
        }
    }
    keyPressed() {}
    transition(prev) {}
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
