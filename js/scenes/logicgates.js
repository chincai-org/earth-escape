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
        this.currDir = 8;
        this.grid[0] = 1;
        this.grid[72] = 1;
        this.grid[80] = 2;
        this.colour = [null, [255, 165, 0], [255, 165, 200], [255, 0, 0], [255, 255, 0], [0, 255, 0], [0, 0, 255]]
        this.mode = 3;

    }

    draw() {
        stroke(0);
        strokeWeight(2);
        translate(this.leftPad, this.topPad);

        for (let i = 0; i <= this.gridSize; ++i) {
            line(0, i * this.tileSize, this.gridWidth, i * this.tileSize);
            line(i * this.tileSize, 0, i * this.tileSize, this.gridHeight);
        }

        const drawPosition = [this.tileSize / 4, this.tileSize / 2, this.tileSize * .75, this.tileSize / 8, this.tileSize * .875];
        for (let i = 0; i <= this.gridArea; ++i) {
            let xPosition = (i % this.gridSize) * this.tileSize;
            let yPosition = Math.floor(i / this.gridSize) * this.tileSize;
            fill(...this.colour[3])
            noStroke();
            //0000 up,right,down,left
            if (this.connection[i] & 1)
                rect(xPosition - drawPosition[0], yPosition + drawPosition[0], drawPosition[1], drawPosition[1]);
            if (this.connection[i] & 4)
                rect(xPosition + drawPosition[2], yPosition + drawPosition[0], drawPosition[1], drawPosition[1]);
            if (this.connection[i] & 2)
                rect(xPosition + drawPosition[0], yPosition + drawPosition[2], drawPosition[1], drawPosition[1]);
            if (this.connection[i] & 8)
                rect(xPosition + drawPosition[0], yPosition - drawPosition[0], drawPosition[1], drawPosition[1]);
        }

        for (let i = 0; i <= this.gridArea; ++i) {
            if (this.grid[i]) {
                fill(...this.colour[this.grid[i]]);
                noStroke();
                let xPosition = (i % this.gridSize) * this.tileSize;
                let yPosition = Math.floor(i / this.gridSize) * this.tileSize;
                if (this.grid[i] == 3) {
                    rect(xPosition + drawPosition[0], yPosition + drawPosition[0], drawPosition[1], drawPosition[1]);
                } else if (this.grid[i] == 4) {
                    if (this.dir[i] == 8)
                        triangle(xPosition + drawPosition[1], yPosition + drawPosition[3], xPosition + drawPosition[0], yPosition + drawPosition[2], xPosition + drawPosition[2], yPosition + drawPosition[2]);
                    else if (this.dir[i] == 4)
                        triangle(xPosition + drawPosition[4], yPosition + drawPosition[1], xPosition + drawPosition[0], yPosition + drawPosition[2], xPosition + drawPosition[0], yPosition + drawPosition[0]);
                    else if (this.dir[i] == 2)
                        triangle(xPosition + drawPosition[1], yPosition + drawPosition[4], xPosition + drawPosition[0], yPosition + drawPosition[0], xPosition + drawPosition[2], yPosition + drawPosition[0]);
                    else if (this.dir[i] == 1)
                        triangle(xPosition + drawPosition[3], yPosition + drawPosition[1], xPosition + drawPosition[2], yPosition + drawPosition[2], xPosition + drawPosition[2], yPosition + drawPosition[0]);
                } else if (this.grid[i] == 5 || this.grid[i] == 6) {
                    if (this.dir[i] == 8) {
                        fill(...this.colour[1]);
                        rect(xPosition + drawPosition[1], yPosition + drawPosition[0], drawPosition[1], drawPosition[1]);
                        rect(xPosition, yPosition + drawPosition[0], drawPosition[1], drawPosition[1]);
                        fill(...this.colour[2]);
                        rect(xPosition + drawPosition[0], yPosition, drawPosition[1], drawPosition[1]);
                    } else if (this.dir[i] == 4) {
                        fill(...this.colour[1]);
                        rect(xPosition + drawPosition[0], yPosition, drawPosition[1], drawPosition[1]);
                        rect(xPosition + drawPosition[0], yPosition + drawPosition[1], drawPosition[1], drawPosition[1]);
                        fill(...this.colour[2]);
                        rect(xPosition + drawPosition[1], yPosition + drawPosition[0], drawPosition[1], drawPosition[1]);
                    } else if (this.dir[i] == 2) {
                        fill(...this.colour[1]);
                        rect(xPosition + drawPosition[1], yPosition + drawPosition[0], drawPosition[1], drawPosition[1]);
                        rect(xPosition, yPosition + drawPosition[0], drawPosition[1], drawPosition[1]);
                        fill(...this.colour[2]);
                        rect(xPosition + drawPosition[0], yPosition + drawPosition[1], drawPosition[1], drawPosition[1]);
                    } else if (this.dir[i] == 1) {
                        fill(...this.colour[1]);
                        rect(xPosition + drawPosition[0], yPosition, drawPosition[1], drawPosition[1]);
                        rect(xPosition + drawPosition[0], yPosition + drawPosition[1], drawPosition[1], drawPosition[1]);
                        fill(...this.colour[2]);
                        rect(xPosition, yPosition + drawPosition[0], drawPosition[0], drawPosition[1]);
                    }

                    fill(...this.colour[this.grid[i]]);
                    ellipse(xPosition + drawPosition[1], yPosition + drawPosition[1], drawPosition[1]);
                } else {
                    rect(xPosition + drawPosition[0], yPosition + drawPosition[0], drawPosition[1], drawPosition[1]);
                }
            }
        }
    }

    update() {
        switch (keyCode) {
            case 69:
                //e, erase
                this.mode = 0;
                break;
            case 87:
                //w, wire
                this.mode = 3;
                break;
            case 78:
                //n, not gate
                this.mode = 4;
                break;
            case 65:
                //a, and gate
                this.mode = 5;
                break;
            case 79:
                //o, or gate
                this.mode = 6;
                break;
        }
        if (mouseIsPressed) {
            let x = Math.floor((mouseX - this.leftPad) / this.tileSize);
            let y = Math.floor((mouseY - this.topPad) / this.tileSize);

            if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
                this.placeStuff(this.mode, y * this.gridSize + x, x, y, this.currDir);
            }

        }
    }

    keyPressed() {
        if (keyCode == 82) {
            //rotate
            this.currDir >>= 1;
            if (!this.currDir) this.currDir = 8;
        }
    }
    placeStuff(mode, idx, x, y, dir) {
        if (!mode) {
            if ([1, 2].includes(this.grid[idx])) return;
            this.grid[idx] = mode;
            this.connection[idx - 1] = 11 & this.connection[idx - 1];
            this.connection[idx + 1] = 14 & this.connection[idx + 1];
            this.connection[idx + this.gridSize] = 7 & this.connection[idx + this.gridSize];
            this.connection[idx - this.gridSize] = 13 & this.connection[idx - this.gridSize];
            this.connection[idx] = 0;
            this.dir[idx] = 0;
            return;
        }
        if (this.grid[idx]) return;
        this.grid[idx] = mode;
        if (mode == 3) {
            //0000 up,right,down,left
            const availableConect = [1, 2, 3, 4, 5, 6];
            let isDirectionValid4;
            let isDirectionValid5_6;
            let isTarget4;
            let isTarget5_6;
            if (y - 1 >= 0) {
                if (availableConect.includes(this.grid[idx - this.gridSize])) {
                    isDirectionValid4 = this.dir[idx - this.gridSize] === 8 || this.dir[idx - this.gridSize] === 2;
                    isDirectionValid5_6 = this.dir[idx - this.gridSize] !== 8;
                    isTarget4 = this.grid[idx - this.gridSize] === 4;
                    isTarget5_6 = this.grid[idx - this.gridSize] === 5 || this.grid[idx - this.gridSize] === 6;

                    if (isTarget4 ? isDirectionValid4 : isTarget5_6 ? isDirectionValid5_6 : true) {
                        this.connection[idx - this.gridSize] |= 2;
                        this.connection[idx] |= 8;
                    }
                }
            }
            if (x + 1 < this.gridSize) {
                if (availableConect.includes(this.grid[idx + 1])) {
                    isDirectionValid4 = this.dir[idx + 1] === 4 || this.dir[idx + 1] === 1;
                    isDirectionValid5_6 = this.dir[idx + 1] !== 4;
                    isTarget4 = this.grid[idx + 1] === 4;
                    isTarget5_6 = this.grid[idx + 1] === 5 || this.grid[idx + 1] === 6;

                    if (isTarget4 ? isDirectionValid4 : isTarget5_6 ? isDirectionValid5_6 : true) {
                        this.connection[idx + 1] |= 1;
                        this.connection[idx] |= 4;
                    }
                }
            }
            if (y + 1 < this.gridSize) {
                if (availableConect.includes(this.grid[idx + this.gridSize])) {
                    isDirectionValid4 = this.dir[idx + this.gridSize] === 2 || this.dir[idx + this.gridSize] === 8;
                    isDirectionValid5_6 = this.dir[idx + this.gridSize] !== 2;
                    isTarget4 = this.grid[idx + this.gridSize] === 4;
                    isTarget5_6 = this.grid[idx + this.gridSize] === 5 || this.grid[idx + this.gridSize] === 6;

                    if (isTarget4 ? isDirectionValid4 : isTarget5_6 ? isDirectionValid5_6 : true) {
                        this.connection[idx + this.gridSize] |= 8;
                        this.connection[idx] |= 2;
                    }
                }
            }
            if (x - 1 >= 0) {
                if (availableConect.includes(this.grid[idx - 1])) {
                    isDirectionValid4 = this.dir[idx - 1] === 1 || this.dir[idx - 1] === 4;
                    isDirectionValid5_6 = this.dir[idx - 1] !== 1;
                    isTarget4 = this.grid[idx - 1] === 4;
                    isTarget5_6 = this.grid[idx - 1] === 5 || this.grid[idx - 1] === 6;

                    if (isTarget4 ? isDirectionValid4 : isTarget5_6 ? isDirectionValid5_6 : true) {
                        this.connection[idx - 1] |= 4;
                        this.connection[idx] |= 1;
                    }
                }
            }
        }
        if (mode == 4 || mode == 5 || mode == 6) {
            //0000 up,right,down,left
            this.dir[idx] = dir;
        }
        if (mode == 4) {
            //0000 up,right,down,left
            const availableConect = [1, 2, 3, 4, 5, 6];
            let isDirectionValid4;
            let isDirectionValid4nxt;
            let isDirectionValid5_6;
            let isTarget5_6;
            let isTarget4;
            if (y - 1 >= 0) {
                if (availableConect.includes(this.grid[idx - this.gridSize])) {
                    isDirectionValid4nxt = this.dir[idx - this.gridSize] === 8 || this.dir[idx - this.gridSize] === 2;
                    isDirectionValid4 = this.dir[idx] === 8 || this.dir[idx] === 2;
                    isDirectionValid5_6 = this.dir[idx - this.gridSize] !== 8;
                    isTarget5_6 = this.grid[idx - this.gridSize] === 5 || this.grid[idx - this.gridSize] === 6;
                    isTarget4 = this.grid[idx - this.gridSize] === 4;

                    if (isTarget5_6 ? isDirectionValid5_6 : isTarget4 ? isDirectionValid4nxt ? isDirectionValid4 : false : isDirectionValid4) {
                        this.connection[idx - this.gridSize] |= 2;
                        this.connection[idx] |= 8;
                    }
                }
            }
            if (x + 1 < this.gridSize) {
                if (availableConect.includes(this.grid[idx + 1])) {
                    isDirectionValid4nxt = this.dir[idx + 1] === 4 || this.dir[idx + 1] === 1;
                    isDirectionValid4 = this.dir[idx] === 4 || this.dir[idx] === 1;
                    isDirectionValid5_6 = this.dir[idx + 1] !== 4;
                    isTarget5_6 = this.grid[idx + 1] === 5 || this.grid[idx + 1] === 6;
                    isTarget4 = this.grid[idx + 1] === 4;

                    if (isTarget5_6 ? isDirectionValid5_6 : isTarget4 ? isDirectionValid4nxt ? isDirectionValid4 : false : isDirectionValid4) {
                        this.connection[idx + 1] |= 1;
                        this.connection[idx] |= 4;
                    }
                }
            }
            if (y + 1 < this.gridSize) {
                if (availableConect.includes(this.grid[idx + this.gridSize])) {
                    isDirectionValid4nxt = this.dir[idx + this.gridSize] === 2 || this.dir[idx + this.gridSize] === 8;
                    isDirectionValid4 = this.dir[idx] === 2 || this.dir[idx] === 8;
                    isDirectionValid5_6 = this.dir[idx + this.gridSize] !== 2;
                    isTarget5_6 = this.grid[idx + this.gridSize] === 5 || this.grid[idx + this.gridSize] === 6;
                    isTarget4 = this.grid[idx + this.gridSize] === 4;

                    if (isTarget5_6 ? isDirectionValid5_6 : isTarget4 ? isDirectionValid4nxt ? isDirectionValid4 : false : isDirectionValid4) {
                        this.connection[idx + this.gridSize] |= 8;
                        this.connection[idx] |= 2;
                    }
                }
            }
            if (x - 1 >= 0) {
                if (availableConect.includes(this.grid[idx - 1])) {
                    isDirectionValid4nxt = this.dir[idx - 1] === 1 || this.dir[idx - 1] === 4;
                    isDirectionValid4 = this.dir[idx] === 1 || this.dir[idx] === 4;
                    isDirectionValid5_6 = this.dir[idx - 1] !== 1;
                    isTarget5_6 = this.grid[idx - 1] === 5 || this.grid[idx - 1] === 6;
                    isTarget4 = this.grid[idx - 1] === 4;

                    if (isTarget5_6 ? isDirectionValid5_6 : isTarget4 ? isDirectionValid4nxt ? isDirectionValid4 : false : isDirectionValid4) {
                        this.connection[idx - 1] |= 4;
                        this.connection[idx] |= 1;
                    }
                }
            }
        }
        if (mode == 5 || mode == 6) {
            //0000 up,right,down,left
            const availableConect = [1, 2, 3, 4, 5, 6];
            let isDirectionValid4;
            let isDirectionValid4nxt;
            let isDirectionValid5_6nxt;
            let isDirectionValid5_6;
            let isTarget5_6;
            let isTarget4;
            if (y - 1 >= 0) {
                if (availableConect.includes(this.grid[idx - this.gridSize])) {
                    isDirectionValid4nxt = this.dir[idx - this.gridSize] === 8 || this.dir[idx - this.gridSize] === 2;
                    isDirectionValid4 = this.dir[idx] === 8 || this.dir[idx] === 2;
                    isDirectionValid5_6 = this.dir[idx] !== 8;
                    isDirectionValid5_6nxt = this.dir[idx - this.gridSize] !== 8;
                    isTarget5_6 = this.grid[idx - this.gridSize] === 5 || this.grid[idx - this.gridSize] === 6;
                    isTarget4 = this.grid[idx - this.gridSize] === 4;

                    if (isTarget5_6 ? isDirectionValid5_6nxt ? isDirectionValid5_6 : false : isTarget4 ? isDirectionValid4nxt ? isDirectionValid4 : false : isDirectionValid4) {
                        this.connection[idx - this.gridSize] |= 2;
                        this.connection[idx] |= 8;
                    }
                }
            }
            if (x + 1 < this.gridSize) {
                if (availableConect.includes(this.grid[idx + 1])) {
                    isDirectionValid4nxt = this.dir[idx + 1] === 4 || this.dir[idx + 1] === 1;
                    isDirectionValid4 = this.dir[idx] === 4 || this.dir[idx] === 1;
                    isDirectionValid5_6 = this.dir[idx] !== 4;
                    isDirectionValid5_6nxt = this.dir[idx + 1] !== 4;
                    isTarget5_6 = this.grid[idx + 1] === 5 || this.grid[idx + 1] === 6;
                    isTarget4 = this.grid[idx + 1] === 4;

                    if (isTarget5_6 ? isDirectionValid5_6nxt ? isDirectionValid5_6 : false : isTarget4 ? isDirectionValid4nxt ? isDirectionValid4 : false : isDirectionValid4) {
                        this.connection[idx + 1] |= 1;
                        this.connection[idx] |= 4;
                    }
                }
            }
            if (y + 1 < this.gridSize) {
                if (availableConect.includes(this.grid[idx + this.gridSize])) {
                    isDirectionValid4nxt = this.dir[idx + this.gridSize] === 2 || this.dir[idx + this.gridSize] === 8;
                    isDirectionValid4 = this.dir[idx] === 2 || this.dir[idx] === 8;
                    isDirectionValid5_6 = this.dir[idx] !== 2;
                    isDirectionValid5_6nxt = this.dir[idx + this.gridSize] !== 2;
                    isTarget5_6 = this.grid[idx + this.gridSize] === 5 || this.grid[idx + this.gridSize] === 6;
                    isTarget4 = this.grid[idx + this.gridSize] === 4;

                    if (isTarget5_6 ? isDirectionValid5_6nxt ? isDirectionValid5_6 : false : isTarget4 ? isDirectionValid4nxt ? isDirectionValid4 : false : isDirectionValid4) {
                        this.connection[idx + this.gridSize] |= 8;
                        this.connection[idx] |= 2;
                    }
                }
            }
            if (x - 1 >= 0) {
                if (availableConect.includes(this.grid[idx - 1])) {
                    isDirectionValid4nxt = this.dir[idx - 1] === 1 || this.dir[idx - 1] === 4;
                    isDirectionValid4 = this.dir[idx] === 1 || this.dir[idx] === 4;
                    isDirectionValid5_6 = this.dir[idx] !== 1;
                    isDirectionValid5_6nxt = this.dir[idx - 1] !== 1;
                    isTarget5_6 = this.grid[idx - 1] === 5 || this.grid[idx - 1] === 6;
                    isTarget4 = this.grid[idx - 1] === 4;

                    if (isTarget5_6 ? isDirectionValid5_6nxt ? isDirectionValid5_6 : false : isTarget4 ? isDirectionValid4nxt ? isDirectionValid4 : false : isDirectionValid4) {
                        this.connection[idx - 1] |= 4;
                        this.connection[idx] |= 1;
                    }
                }
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
