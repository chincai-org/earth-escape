class Alien {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.velocity = 0.2;

        this.destinations = [];
    }

    stopTravel() {
        this.destinations = [];
    }

    travelTo(x, y) {
        this.destinations.push({ x, y });
        console.log(this.destinations);
    }

    update(dt) {
        if (this.destinations.length > 0) {
            let dest = this.destinations[0];
            let dx = dest.x - this.x;
            let dy = dest.y - this.y;

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

    draw() {
        push();
        translate(this.x, this.y);
        fill(0);
        ellipse(0, 0, 20, 20);

        for (let i = 0; i < this.destinations.length; i++) {
            let dest = this.destinations[i];
            let prev =
                i === 0 ? { x: this.x, y: this.y } : this.destinations[i - 1];
            stroke(0);
            // line(0, 0, dest.x - this.x, dest.y - this.y);
            line(
                prev.x - this.x,
                prev.y - this.y,
                dest.x - this.x,
                dest.y - this.y
            );
        }

        pop();
    }
}
