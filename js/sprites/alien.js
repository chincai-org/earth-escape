JUNIOR = 0;
SENIOR = 1;

class Alien {
    constructor(x, y, id = JUNIOR) {
        this.x = x * canvasWidth;
        this.y = y * canvasHeight;

        this.velocity = 0.2;

        this.destinations = [];
        this.id = id;

        this.lastUpdate = 0;
        this.FPS = 0;

        this.exist = true;
    }

    setPos(x, y) {
        this.x = x * canvasWidth;
        this.y = y * canvasHeight;
    }

    stopTravel() {
        this.destinations = [];
    }

    travelTo(x, y) {
        this.destinations.push({ x, y });
        // console.table(this.destinations);
    }

    isTravelling() {
        return this.destinations.length;
    }

    update(dt) {
        if (this.isTravelling()) {
            let dest = this.destinations[0];
            let dx = dest.x - this.x;
            let dy = dest.y - this.y;

            // console.log("dest", dest.x, dest.y);

            let angle = atan2(dy, dx);

            let nextX = this.x + cos(angle) * this.velocity * dt;
            let nextY = this.y + sin(angle) * this.velocity * dt;

            // Check if the next position overshoots the destination
            if (
                dist(this.x, this.y, nextX, nextY) >
                dist(this.x, this.y, dest.x, dest.y)
            ) {
                this.x = dest.x;
                this.y = dest.y;
                this.destinations.shift();
            } else {
                this.x = nextX;
                this.y = nextY;
            }
        }
    }

    chair() {
        //
    }

    draw() {
        if (!this.exist) {
            return;
        }

        push();
        translate(this.x, this.y);
        fill(0, 255, 0);
        ellipse(0, 0, 50 + this.id * 10, 50 + this.id * 10);

        // for (let i = 0; i < this.destinations.length; i++) {
        //     let dest = this.destinations[i];
        //     let prev =
        //         i === 0 ? { x: this.x, y: this.y } : this.destinations[i - 1];
        //     stroke(0);
        //     // line(0, 0, dest.x - this.x, dest.y - this.y);
        //     line(
        //         prev.x - this.x,
        //         prev.y - this.y,
        //         dest.x - this.x,
        //         dest.y - this.y
        //     );
        // }

        pop();
    }
}
