class Scene {
    constructor() {
        this.ui = [];
        this.interactables = [];

        this.jr = new Alien(0, 0);
        this.sr = new Alien(0, 0, SENIOR);

        this.jrStart = { x: 0, y: 0 };
        this.jrEnd = { x: 0, y: 0 };

        this.srStart = { x: 0, y: 0 };
        this.srEnd = { x: 0, y: 0 };

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

    transition(prev) {
        this.jr.x = this.jrStart.x * canvasWidth;
        this.jr.y = this.jrStart.y * canvasHeight;

        this.jr.travelTo(
            this.jrEnd.x * canvasWidth,
            this.jrEnd.y * canvasHeight
        );

        this.sr.x = this.srStart.x * canvasWidth;
        this.sr.y = this.srStart.y * canvasHeight;

        this.sr.travelTo(
            this.srEnd.x * canvasWidth,
            this.srEnd.y * canvasHeight
        );
    }
}
