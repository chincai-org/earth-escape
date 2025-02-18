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
        this.connection = new Array(80); for (let i = 0; i < 80; ++i) this.grid[i] = 0;
        this.dir = new Array(80); for (let i = 0; i < 80; ++i) this.grid[i] = 0;
        this.grid[0] = 1;
        this.grid[80] = 2;
        this.colour = [null, [255, 165, 0], [255, 165, 200], [255, 0, 0], [255, 255, 0], [0, 255, 0], [0, 0, 255]]

    }

    draw() {
        stroke(0);
        strokeWeight(2);

        for (let i = 0; i <= this.gridSize; ++i) {
            line(this.leftPad, this.topPad + i * this.tileSize, this.leftPad + this.gridWidth, this.topPad + i * this.tileSize);
            line(this.leftPad + i * this.tileSize, this.topPad, this.leftPad + i * this.tileSize, this.topPad + this.gridHeight);
        }
        const drawPosition = [this.tileSize / 4, this.tileSize / 2, this.tileSize * .75]; // top to bottom
        for (let i = 0; i <= this.gridArea; ++i) {
            if (this.grid[i]) {
                fill(...this.colour[this.grid[i]]);
                noStroke();
                let xPosition = this.leftPad + (i % this.gridSize) * this.tileSize;
                let yPosition = this.topPad + Math.floor(i / this.gridSize) * this.tileSize;
                if (this.grid[i] == 3) {
                    rect(xPosition + drawPosition[0], yPosition + drawPosition[0], drawPosition[1], drawPosition[1]);
                    //0000 up,right,down,left
                    if (this.connection[i] & 1) {
                        rect(xPosition - drawPosition[0], yPosition + drawPosition[0], drawPosition[1], drawPosition[1]);
                    }
                    if (this.connection[i] & 4) {
                        rect(xPosition + drawPosition[2], yPosition + drawPosition[0], drawPosition[1], drawPosition[1]);
                    }
                    if (this.connection[i] & 2) {
                        rect(xPosition + drawPosition[0], yPosition + drawPosition[2], drawPosition[1], drawPosition[1]);
                    }
                    if (this.connection[i] & 8) {
                        rect(xPosition + drawPosition[0], yPosition - drawPosition[0], drawPosition[1], drawPosition[1]);
                    }
                } else if (this.grid[i] == 4) {
                    triangle(xPosition + drawPosition[1], yPosition + drawPosition[0], xPosition + drawPosition[0], yPosition + drawPosition[2], xPosition + drawPosition[2], yPosition + drawPosition[2]);
                } else {
                    rect(xPosition + drawPosition[0], yPosition + drawPosition[0], drawPosition[1], drawPosition[1]);
                }
            }
        }
    }

    update() {
        let mode = 3; //wire
        switch (keyCode) {
            case 69:
                //e, erase
                mode = 0;
                break;
            case 87:
                //w, wire
                mode = 3;
                break;
            case 78:
                //n, not gate
                mode = 4;
                break;
            case 65:
                //a, and gate
                mode = 5;
                break;
            case 79:
                //o, or gate
                mode = 6;
                break;

        }
        if (mouseIsPressed) {
            let x = Math.floor((mouseX - this.leftPad) / this.tileSize);
            let y = Math.floor((mouseY - this.topPad) / this.tileSize);

            if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
                this.placeStuff(mode, y * this.gridSize + x, x, y);
            }

        }
    }
    mousePressed() { }

    mouseReleased() {
    }

    placeStuff(mode, idx, x, y) {
        if (!mode) {
            if ([1, 2].includes(this.grid[idx])) return;
            this.grid[idx] = mode;
            this.connection[idx - 1] = 11 & this.connection[idx - 1];
            this.connection[idx + 1] = 14 & this.connection[idx + 1];
            this.connection[idx + this.gridSize] = 7 & this.connection[idx + this.gridSize];
            this.connection[idx - this.gridSize] = 13 & this.connection[idx - this.gridSize];
            this.connection[idx] = 0;
            return;
        }
        if (this.grid[idx]) return;
        this.grid[idx] = mode;
        if (mode == 3) {
            //0000 up,right,down,left
            const availableConect = [1, 2, 3];
            if (y - 1 >= 0) {
                if (availableConect.includes(this.grid[idx - this.gridSize])) {
                    this.connection[idx - this.gridSize] |= 2;
                    this.connection[idx] |= 8;
                }
            }
            if (x + 1 < this.gridSize) {
                if (availableConect.includes(this.grid[idx + 1])) {
                    this.connection[idx + 1] |= 1;
                    this.connection[idx] |= 4;
                }
            }
            if (y + 1 < this.gridSize) {
                if (availableConect.includes(this.grid[idx + this.gridSize])) {
                    this.connection[idx + this.gridSize] |= 8;
                    this.connection[idx] |= 2;
                }
            }
            if (x - 1 >= 0) {
                if (availableConect.includes(this.grid[idx - 1])) {
                    this.connection[idx - 1] |= 4;
                    this.connection[idx] |= 1;
                }
            }
            return;
        }
        if (mode == 4) {
            //0000 up,right,down,left
            this.dir[idx] |= 8;
            return;
        }
        if (this.grid[idx + this.gridSize] || this.grid[idx + 2 * this.gridSize]) return;
        if ([5, 6].includes(mode)) {
            if (y < (this.gridSize - 2)) {
                this.grid[idx] = this.grid[idx + this.gridSize] = this.grid[idx + 2 * this.gridSize] = mode;
            }
        }
    }

    getCellFromScreenPosition(sx, sy) {
        let x = Math.floor((sx - this.leftPad) / this.tileSize);
        let y = Math.floor((sy - this.topPad) / this.tileSize);

        if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) return this.grid[y * this.gridSize + x];
        return null;
    }

}
