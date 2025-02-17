class LogicGates extends Scene {
    lateUpdate() {
        if (keyIsPressed && (keyCode === ESCAPE || keyCode === 66)) {
            transition(-1);
        }
    }

    init() {
        this.tileSize = 64;
        this.gridSize = 9;
        this.gridArea = 81

        this.gridWidth = this.tileSize * this.gridSize;
        this.gridHeight = this.tileSize * this.gridSize;

        this.leftPad = canvasWidth / 2 - this.gridWidth / 2;
        this.topPad = canvasHeight / 2 - this.gridHeight / 2;

        this.grid = [];
        this.grid[0] = 1;
        this.grid[80] = 2;
        this.colour = [null, [255, 165, 0], [255, 165, 200], [255, 0, 0], [255, 255, 0], [0, 255, 0]]

    }

    draw() {
        stroke(0);
        strokeWeight(1);

        for (let i = 0; i <= this.gridSize; ++i) {
            line(this.leftPad, this.topPad + i * this.tileSize, this.leftPad + this.gridWidth, this.topPad + i * this.tileSize);
            line(this.leftPad + i * this.tileSize, this.topPad, this.leftPad + i * this.tileSize, this.topPad + this.gridHeight);
        }
        for (let i = 0; i <= this.gridArea; ++i) {
            if (this.grid[i]) {
                fill(...this.colour[this.grid[i]]);
                noStroke();
                ellipse(this.leftPad + (i % this.gridSize) * this.tileSize + this.tileSize / 2, this.topPad + Math.floor(i / this.gridSize) * this.tileSize + this.tileSize / 2, this.tileSize / 2);
            }
        }
    }

}
