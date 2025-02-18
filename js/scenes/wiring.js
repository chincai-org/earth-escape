class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isDot = false;
        this.parent = null;
        this.child = null;
        this.friend = null;
        this.color = -1;

        this.colors = [
            [255, 0, 0],
            [255, 255, 0],
            [0, 255, 0],
            [0, 0, 255],
            [255, 0, 255],
            [128, 0, 128]
        ];
    }

    dot(color) {
        this.isDot = true;
        this.color = color;
    }

    draw(leftPad, topPad, tileSize, isTracked) {
        if (this.isDot) {
            fill(...this.colors[this.color]);
            noStroke();
            ellipse(
                leftPad + this.x * tileSize + tileSize / 2,
                topPad + this.y * tileSize + tileSize / 2,
                tileSize / 2 + isTracked * 10
            );
        } else {
            if (this.parent) {
                stroke(...this.colors[this.color]);
                strokeWeight(20 + isTracked * 10);
                line(
                    leftPad + this.x * tileSize + tileSize / 2,
                    topPad + this.y * tileSize + tileSize / 2,
                    leftPad + this.parent.x * tileSize + tileSize / 2,
                    topPad + this.parent.y * tileSize + tileSize / 2
                );
            }

            if (this.child) {
                stroke(...this.colors[this.color]);
                strokeWeight(20 + isTracked * 10);
                line(
                    leftPad + this.x * tileSize + tileSize / 2,
                    topPad + this.y * tileSize + tileSize / 2,
                    leftPad + this.child.x * tileSize + tileSize / 2,
                    topPad + this.child.y * tileSize + tileSize / 2
                );
            }
        }
    }

    setChild(cell) {
        this.child = cell;
        cell.parent = this;
        cell.color = this.color;
    }

    abandonChild() {
        if (this.child) {
            this.child.parent = null;
            // this.child.color = -1;
            this.child = null;
        }
    }

    abandonParent() {
        if (this.parent) {
            this.parent.child = null;
            // this.parent.color = -1;
            this.parent = null;
        }
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }

    debug() {
        console.log(this.x, this.y);
    }

    recursivelyAbandon() {
        if (this.child) {
            this.recursivelyAbandonChild();
        } else if (this.parent) {
            this.recursivelyAbandonParent();
        }
    }

    recursivelyAbandonChild() {
        if (this.child) {
            this.child.recursivelyAbandonChild();
            this.abandonChild();
        }
    }

    recursivelyAbandonParent() {
        if (this.parent) {
            this.parent.recursivelyAbandonParent();
            this.abandonParent();
        }
    }

    tree() {
        let track = [this];
        let current = this;

        while (current.parent) {
            current = current.parent;
            track.unshift(current);
        }

        return track;
    }

    isNeighbor(other) {
        return (
            (this.x === other.x && Math.abs(this.y - other.y) === 1) ||
            (this.y === other.y && Math.abs(this.x - other.x) === 1)
        );
    }

    makeFriend(other) {
        this.friend = other;
        other.friend = this;
    }
}

class Wiring extends Scene {
    lateUpdate() {
        if (keyIsPressed && (keyCode === ESCAPE || keyCode === 66)) {
            transition(-1);
        }
    }

    init() {
        this.tileSize = 64;
        this.gridSize = 6;

        this.gridWidth = this.tileSize * this.gridSize;
        this.gridHeight = this.tileSize * this.gridSize;

        this.leftPad = canvasWidth / 2 - this.gridWidth / 2;
        this.topPad = canvasHeight / 2 - this.gridHeight / 2;

        this.initCells();

        this.track = [];
        this.tracking = false;
    }

    initCells() {
        this.cells = [];
        for (let i = 0; i < this.gridSize; i++) {
            this.cells[i] = [];
            for (let j = 0; j < this.gridSize; j++) {
                this.cells[i][j] = new Cell(i, j);
            }
        }

        const dots = [
            [
                [2, 0],
                [0, 5]
            ],
            [
                [1, 1],
                [3, 4]
            ],
            [
                [2, 5],
                [5, 5]
            ],
            [
                [4, 2],
                [5, 0]
            ],
            [
                [4, 3],
                [5, 2]
            ],
            [
                [2, 1],
                [3, 3]
            ]
        ];

        for (let color = 0; color < dots.length; color++) {
            let first = null;
            for (let i = 0; i < dots[color].length; i++) {
                let x = dots[color][i][0];
                let y = dots[color][i][1];
                this.cells[x][y].dot(color);

                if (i == 0) {
                    first = this.cells[x][y];
                } else {
                    first.makeFriend(this.cells[x][y]);
                }
            }
        }
    }

    draw() {
        //background(255);

        this.drawGrid();
        this.drawCells();
    }

    drawGrid() {
        stroke(0);
        strokeWeight(1);

        for (let i = 0; i <= this.gridSize; i++) {
            line(
                this.leftPad,
                this.topPad + i * this.tileSize,
                this.leftPad + this.gridWidth,
                this.topPad + i * this.tileSize
            );
            line(
                this.leftPad + i * this.tileSize,
                this.topPad,
                this.leftPad + i * this.tileSize,
                this.topPad + this.gridHeight
            );
        }
    }

    drawCells() {
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                this.cells[i][j].draw(
                    this.leftPad,
                    this.topPad,
                    this.tileSize,
                    this.isTracked(this.cells[i][j])
                );
            }
        }
    }

    update() {
        if (mouseIsPressed && this.tracking) {
            console.log(this.track);
            let cell = this.getCellFromScreenPosition(mouseX, mouseY);

            if (cell == null) {
                // Out of bounds
                return;
            }

            if (cell.isDot) {
                if (cell.color !== this.track[0].color) {
                    // Is dot but not the same color as track
                    return;
                }

                if (cell.equals(this.track[0])) {
                    // The dot is the head of the track
                    if (this.track.length > 2) {
                        // Uturn back to the starting dot
                        return;
                    } else if (this.track.length === 2) {
                        // 2nd dot undo action
                        this.track[0].abandonChild();
                        this.track.pop();
                        return;
                    } else {
                        // Still at first dot
                        return;
                    }
                }

                if (!cell.isNeighbor(this.track[this.track.length - 1])) {
                    return; // Not a neighbor
                }

                this.track[this.track.length - 1].setChild(cell);
                this.stopTrack();
            } else if (
                this.track.length >= 2 &&
                cell.equals(this.track[this.track.length - 2])
            ) {
                // Undo action
                this.track[this.track.length - 2].abandonChild();
                this.track.pop();
            } else {
                let lastCell = this.track[this.track.length - 1];

                if (!cell.equals(lastCell)) {
                    if (cell.parent) {
                        this.stopTrack(); // Taken path
                    } else if (!lastCell.isNeighbor(cell)) {
                        return; // Not a neighbor
                    } else {
                        // Valid path
                        lastCell.setChild(cell);
                        this.track.push(cell);
                    }
                }
            }
        }
    }

    mousePressed() {
        super.mousePressed();
        console.log("mp");
        let cell = this.getCellFromScreenPosition(mouseX, mouseY);

        if (cell.isDot) {
            this.tracking = true;
            this.track = [cell];
            cell.recursivelyAbandon();
            cell.friend.recursivelyAbandon();
            cell.debug();
        } else if (cell.parent && !cell.child) {
            this.tracking = true;
            this.track = cell.tree();
        }
    }

    mouseReleased() {
        super.mouseReleased();
        console.log("mr");
        this.stopTrack();
    }

    getCellFromScreenPosition(sx, sy) {
        let x = Math.floor((sx - this.leftPad) / this.tileSize);
        let y = Math.floor((sy - this.topPad) / this.tileSize);

        if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
            return this.cells[x][y];
        }

        return null;
    }

    isTracked(cell) {
        for (let i = 0; i < this.track.length; i++) {
            if (this.track[i].equals(cell)) {
                return true;
            }
        }

        return false;
    }

    stopTrack() {
        this.tracking = false;
        this.track = [];
    }
}
