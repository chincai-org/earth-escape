class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isDot = false;
        this.parent = null;
        this.child = null;
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

    draw(leftPad, topPad, tileSize) {
        if (this.isDot) {
            fill(...this.colors[this.color]);
            noStroke();
            ellipse(
                leftPad + this.x * tileSize + tileSize / 2,
                topPad + this.y * tileSize + tileSize / 2,
                tileSize / 2
            );
        }
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
            for (let i = 0; i < dots[color].length; i++) {
                let x = dots[color][i][0];
                let y = dots[color][i][1];
                this.cells[x][y].dot(color);
            }
        }
    }

    draw() {
        background(255);

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
                this.cells[i][j].draw(this.leftPad, this.topPad, this.tileSize);
            }
        }
    }
}
