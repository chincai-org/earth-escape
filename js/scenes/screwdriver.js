class screwDriver extends Scene {
    init() {
        this.screws = [];
        this.screwRadius = 40;
        this.tick = 0;
    }
    update() {
        if (this.tick % 10 == 0) {
            let X;
            let Y;
            do {
                X = this.randint(canvasWidth);
                Y = this.randint(canvasHeight);
            } while (this.screws.some(([x, y]) => Math.hypot(x - X, y - Y) <= (1.1 * this.screwRadius)));
            this.screws.push([X, Y]);
        }
        this.tick++;
        if (mouseIsPressed) {
            for (let i = 0; i < this.screws.length; ++i) {
                if (Math.hypot(this.screws[i][0] - mouseX, this.screws[i][1] - mouseY) < (this.screwRadius)) {
                    this.screws.splice(i, 1);
                    console.log("o")
                    break;
                }
            }
        }
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
