class Grid {
    constructor(gridSize, blocks, leftPad, topPad, cellSize) {
        this.grid = Array.from({ length: gridSize }, () =>
            Array(gridSize).fill(0)
        );

        for (let block of blocks) {
            this.grid[block[1]][block[0]] = 1;
        }

        this.shuffle();

        this.gridSize = gridSize;
        this.leftPad = leftPad;
        this.topPad = topPad;
        this.cellSize = cellSize;
    }

    draw() {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] === 1) {
                    // grey
                    fill(200);
                    strokeWeight(1);
                    rect(
                        this.leftPad + x * this.cellSize,
                        this.topPad + y * this.cellSize,
                        this.cellSize,
                        this.cellSize
                    );
                }
            }
        }

        // Grid lines

        let isHovered = this.isHovered();

        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                stroke(0);
                strokeWeight(1 + isHovered * 2);
                noFill();
                rect(
                    this.leftPad + x * this.cellSize,
                    this.topPad + y * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
            }
        }
    }

    shuffle() {
        // Randomly move and rotate

        let rotations = [0, 1, 2, 3];

        for (let i = 0; i < 100; i++) {
            let rotation =
                rotations[Math.floor(Math.random() * rotations.length)];

            for (let j = 0; j < rotation; j++) {
                this.rotate();
            }
        }
    }

    add(other) {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                this.grid[y][x] += other.grid[y][x];
            }
        }
    }

    sum() {
        let sum = 0;
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                sum += this.grid[y][x];
            }
        }
        return sum;
    }

    rotate() {
        let newGrid = Array.from({ length: this.grid.length }, () =>
            Array(this.grid.length).fill(0)
        );

        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                newGrid[x][this.grid.length - 1 - y] = this.grid[y][x];
            }
        }

        this.grid = newGrid;
    }

    isHovered() {
        if (
            mouseX > this.leftPad &&
            mouseX < this.leftPad + this.grid.length * this.cellSize &&
            mouseY > this.topPad &&
            mouseY < this.topPad + this.grid.length * this.cellSize
        ) {
            return true;
        }

        return false;
    }

    static zeros(gridSize) {
        return new Grid(gridSize, [], 0, 0, 0);
    }

    isPerfect() {
        // Every single number is exactly one
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] !== 1) {
                    return false;
                }
            }
        }

        return true;
    }
}

class Puzzle extends Scene {
    init() {
        this.tileSize = 32;
        this.gridSize = 5;

        this.gridWidth = this.tileSize * this.gridSize;
        this.gridHeight = this.tileSize * this.gridSize;

        this.initGrids();
    }

    initGrids() {
        this.grids = [];

        const blocks = [
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [0, 1],
                [2, 1]
            ],
            [
                [1, 1],
                [0, 2],
                [1, 2],
                [1, 3],
                [2, 3]
            ],
            [
                [0, 3],
                [0, 4],
                [1, 4]
            ],
            [[3, 0]],
            [
                [3, 1],
                [2, 2],
                [3, 2],
                [3, 3]
            ],
            [
                [2, 4],
                [3, 4],
                [4, 4]
            ],
            [
                [4, 0],
                [4, 1],
                [4, 2],
                [4, 3]
            ]
        ];

        blocks.sort(() => Math.random() - 0.5);

        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i];

            let leftPad = 0;
            let topPad = 0;

            if (i < 4) {
                leftPad = ((i + 0.5) * canvasWidth) / 4 - this.gridWidth / 2;
                topPad = canvasHeight * 0.25 - this.gridHeight / 2;
            } else {
                leftPad = ((i - 3.5) * canvasWidth) / 3 - this.gridWidth / 2;
                topPad = canvasHeight * 0.75 - this.gridHeight / 2;
            }

            let grid = new Grid(
                this.gridSize,
                block,
                leftPad,
                topPad,
                this.tileSize
            );
            this.grids.push(grid);
        }
    }

    draw() {
        for (let grid of this.grids) {
            grid.draw();
        }

        if (this.isSolved()) {
            text("Solved", 0, 0, 100, 100);
        } else {
            text("Not solved", 0, 0, 100, 100);
        }
    }

    mousePressed() {
        super.mousePressed();
        for (let grid of this.grids) {
            if (grid.isHovered()) {
                grid.rotate();
            }
        }
    }

    isSolved() {
        let sum = Grid.zeros(this.gridSize);
        console.log(sum.grid);

        for (let grid of this.grids) {
            sum.add(grid);
        }

        return sum.isPerfect();
    }
}
