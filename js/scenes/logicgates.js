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

        this.grid = new Array(80); for (let i = 0; i < 80; ++i) this.grid[i] = 0;
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

    update() {
        let mode = 3; //wire
        if (keyCode == 69) { //e
            mode = 0; //erase
        }

        if (mouseIsPressed) {
            let x = Math.floor((mouseX - this.leftPad) / this.tileSize);
            let y = Math.floor((mouseY - this.topPad) / this.tileSize);

            if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
                const idx = y * this.gridSize + x;
                if (!this.grid[idx]) this.grid[idx] = mode;
                if (!mode) if (!([1, 2].includes(this.grid[idx]))) this.grid[idx] = mode;
            }

        }
    }

    mousePressed() {
    }

    mouseReleased() {
    }

    getCellFromScreenPosition(sx, sy) {
        let x = Math.floor((sx - this.leftPad) / this.tileSize);
        let y = Math.floor((sy - this.topPad) / this.tileSize);

        if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) return this.grid[y * this.gridSize + x];
        return null;
    }

}
