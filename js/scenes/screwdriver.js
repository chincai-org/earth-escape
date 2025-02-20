class screwDriver extends Scene {
    init() {
        this.screws = [];
        this.screwDiameter = 40;
        this.tick = 0;
        this.screwDriverType = -1;
        this.screwType = [[255, 255, 255], [255, 0, 0]];
    }
    update() {
        if (this.tick % 30 == 0) {
            let X;
            let Y;
            let screw;
            do {
                X = this.randint(canvasWidth);
                Y = this.randint(canvasHeight);
                screw = this.randint(this.screwType.length);
            } while (this.screws.some(([x, y]) => Math.hypot(x - X, y - Y) <= (1.1 * this.screwDiameter)));
            this.screws.push([X, Y, screw]);
        }
        this.tick++;
        if (mouseIsPressed) {
            for (let i = 0; i < this.screws.length; ++i) {
                if (Math.hypot(this.screws[i][0] - mouseX, this.screws[i][1] - mouseY) < (this.screwDiameter / 2)) {
                    if (this.screwDriverType === this.screws[i][2])
                        this.screws.splice(i, 1);
                    break;
                }
            }
        }

        switch (keyCode) {
            case 80: //p
                this.screwDriverType = 0;
                break;
            case 78: //n
                this.screwDriverType = 1;
                break;
            default:
                this.screwDriverType = -1;
        }
    }
    randint(max) {
        return Math.floor(Math.random() * max);
    }

    draw() {
        background(0)
        noStroke();
        for (let screw of this.screws) {
            fill(...this.screwType[screw[2]]);
            ellipse(screw[0], screw[1], this.screwDiameter);
        }
    }


    keyPressed() { }
}
