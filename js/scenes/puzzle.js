class Grid {
    constructor(gridSize, blocks, leftPad, topPad, cellSize) {
        this.grid = Array.from({ length: gridSize }, () =>
            Array(gridSize).fill(0)
        );

        for (let block of blocks) {
            this.grid[block[1]][block[0]] = 1;
        }

        this.init_sum = blocks.length;

        this.leftPad = leftPad;
        this.topPad = topPad;
        this.cellSize = cellSize;

        this.up_button = new Button(0, 0, 50, 50)
            .setText("Up")
            .onClick(() => this.move("up"));

        this.down_button = new Button(0, 0, 50, 50)
            .setText("Down")
            .onClick(() => this.move("down"));

        this.left_button = new Button(0, 0, 50, 50)

            .setText("Left")
            .onClick(() => this.move("left"));

        this.right_button = new Button(0, 0, 50, 50)
            .setText("Right")
            .onClick(() => this.move("right"));

        this.rotate_button = new Button(0, 0, 50, 50)
            .setText("Rotate")
            .onClick(() => this.rotate());

        this.buttons = [
            this.up_button,
            this.down_button,
            this.left_button,
            this.right_button,
            this.rotate_button
        ];
    }

    draw() {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] === 1) {
                    fill(0);
                    rect(
                        leftPad + x * cellSize,
                        topPad + y * cellSize,
                        cellSize,
                        cellSize
                    );
                }
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

    move(dir) {
        // Move every 1s to the direction
        // If out of bounds, return false

        let newGrid = Array.from({ length: this.grid.length }, () =>
            Array(this.grid.length).fill(0)
        );

        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] === 1) {
                    let newX = x;
                    let newY = y;

                    switch (dir) {
                        case "up":
                            newY--;
                            break;
                        case "down":
                            newY++;
                            break;
                        case "left":
                            newX--;
                            break;
                        case "right":
                            newX++;
                            break;
                    }

                    if (
                        newX < 0 ||
                        newX >= this.grid.length ||
                        newY < 0 ||
                        newY >= this.grid.length
                    ) {
                        return false;
                    }

                    newGrid[newY][newX] = 1;
                }
            }
        }
    }
}

class Puzzle extends Scene {
    init() {
        this.tileSize = 10;
        this.gridSize = 5;

        this.initGrids();
    }

    initGrids() {
        const blocks = [
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [0, 1],
                [2, 0]
            ]
        ];

        for (let block of blocks) {
            let grid = new Grid(this.gridSize, block, 0, 0, this.tileSize);
            this.grids.push(grid);
        }
    }
}
