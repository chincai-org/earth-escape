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
        this.grid[0] = 1;
        this.grid[80] = 2;
        this.colour = [null, [255, 165, 0], [255, 165, 200], [255, 0, 0], [255, 255, 0], [0, 255, 0], [0, 0, 255]]

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
                if (this.grid[i] == 3) {
                    rect(this.leftPad + (i % this.gridSize) * this.tileSize + this.tileSize / 4, this.topPad + Math.floor(i / this.gridSize) * this.tileSize + this.tileSize / 4, this.tileSize / 2, this.tileSize / 2);
                    //0000 up,right,down,left
                    if (this.connection[i] & 1) {
                        rect(this.leftPad + (i % this.gridSize) * this.tileSize - this.tileSize / 4, this.topPad + Math.floor(i / this.gridSize) * this.tileSize + this.tileSize / 4, this.tileSize / 2, this.tileSize / 2);
                    }
                    if (this.connection[i] & 4) {
                        rect(this.leftPad + (i % this.gridSize) * this.tileSize + this.tileSize * 0.75, this.topPad + Math.floor(i / this.gridSize) * this.tileSize + this.tileSize / 4, this.tileSize / 2, this.tileSize / 2);
                    }
                    if (this.connection[i] & 2) {
                        rect(this.leftPad + (i % this.gridSize) * this.tileSize + this.tileSize / 4, this.topPad + Math.floor(i / this.gridSize) * this.tileSize + this.tileSize * .7443, this.tileSize / 2, this.tileSize / 2);
                    }
                    if (this.connection[i] & 8) {
                        rect(this.leftPad + (i % this.gridSize) * this.tileSize + this.tileSize / 4, this.topPad + Math.floor(i / this.gridSize) * this.tileSize - this.tileSize * .2443, this.tileSize / 2, this.tileSize / 2);
                    }
                }
                else {
                    ellipse(this.leftPad + (i % this.gridSize) * this.tileSize + this.tileSize / 2, this.topPad + Math.floor(i / this.gridSize) * this.tileSize + this.tileSize / 2, this.tileSize / 2);
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
            case 73:
                //i, insert wire
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
                const idx = y * this.gridSize + x;
                if (!mode) {
                    if (!([1, 2].includes(this.grid[idx]))) this.grid[idx] = mode;
                } else if (!([5, 6].includes(mode))) {
                    if (!this.grid[idx]) {
                        //0000 up,right,down,left
                        this.grid[idx] = mode;
                        if (y - 1 >= 0) {
                            if (this.grid[idx - this.gridSize] == mode) {
                                this.connection[idx - this.gridSize] |= 2;
                                this.connection[idx] |= 8;
                            }
                        }
                        if (x + 1 < this.gridSize) {
                            if (this.grid[idx + 1] == mode) {
                                this.connection[idx + 1] |= 1;
                                this.connection[idx] |= 4;
                            }
                        }
                        if (y + 1 < this.gridSize) {
                            if (this.grid[idx + this.gridSize] == mode) {
                                this.connection[idx + this.gridSize] |= 8;
                                this.connection[idx] |= 2;
                            }
                        }
                        if (x - 1 >= 0) {
                            if (this.grid[idx - 1] == mode) {
                                this.connection[idx - 1] |= 4;
                                this.connection[idx] |= 1;
                            }
                        }
                    }
                } else if (y < (this.gridSize - 2)) {
                    if (!this.grid[idx] && !this.grid[idx + this.gridSize] && !this.grid[idx + 2 * this.gridSize]) {
                        this.grid[idx] = this.grid[idx + this.gridSize] = this.grid[idx + 2 * this.gridSize] = mode;
                    }
                }
            }

        }
    } mousePressed() { }

    mouseReleased() {
    }

    getCellFromScreenPosition(sx, sy) {
        let x = Math.floor((sx - this.leftPad) / this.tileSize);
        let y = Math.floor((sy - this.topPad) / this.tileSize);

        if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) return this.grid[y * this.gridSize + x];
        return null;
    }

}
