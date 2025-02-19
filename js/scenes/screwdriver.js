class screwDriver extends Scene {
    init() {
        this.screws = [];
        this.screwRadius = 40;
        this.tick = 0;
    }
    update() {
        if (this.tick % 5 == 0) {
            const X = this.randint(canvasWidth);
            const Y = this.randint(canvasHeight);
            if (!this.screws.some([x, y] => Math.hypot(x - X, y - Y) > (2 * this.screwRadius)) {
                this.screws.push([X, Y]);
            }
        }
        this.tick += 1;
    }
    randint(max) {
        return Math.floor(Math.random() * max);
    }

    draw() {

        background(0)
        fill(255, 255, 255);
        noStroke();
        for (let screw of this.screws) {
            ellipse(...screw, this.screwRadius);
        }
    }


    keyPressed() { }
}
