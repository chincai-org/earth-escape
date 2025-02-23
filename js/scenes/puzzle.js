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

        this.firstTime = true;

        this.jrStart = { x: 0, y: 0.5 };
        this.jrEnd = { x: 0.2, y: 0.5 };

        this.srStart = { x: 0.8, y: 0.5 };
        this.srEnd = { x: 0.8, y: 0.5 };

        this.door = new Door(this.jr);
        this.door
            .setTransition(CAVE)
            .setBox(
                0.005050505050505051,
                0.39594594594594595,
                0.06421356421356421,
                0.23243243243243245
            )
            .setGoDirection(0.04120111731843575, 0.5127877237851662);

        this.qfc = new Interactable(this.jr);
        this.qfc.setBox(
            0.4371508379888268,
            0.40281329923273657,
            0.1180167597765363,
            0.1969309462915601
        );

        this.interactables.push(this.door);
        this.interactables.push(this.qfc);

        this.dialog = [
            {
                name: "Kikiko",
                text: "Oh hey, what a coincidence!",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "The Quantum Flux Capacitor seems to have broke apart.",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "After investigating, I think I can fix it using superglue.",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "But the pieces are all mixed up.",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "Your task is to rotate them such that it will all fit together when stacked.",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "Ah, and don't forget, the superglue, you might need to go test your luck again.",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "That's all, I will piece them together once you're done, just make sure it's correct. I won't be able to tell, as you know, my eyesight isn't the best.",
                align: "right"
            }
        ];

        this.dialogStarted = false;
        this.dialogEnded = false;
        this.puzzleActive = false;
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

    update(dt) {
        if (this.firstTime && !this.dialogStarted && !dialougeManager.active) {
            dialougeManager.play(this.dialog);
            this.dialogStarted = true;
            return;
        }

        if (this.firstTime && !this.dialogEnded && !dialougeManager.active) {
            this.dialogEnded = true;
            let goDirection = this.door.getGoDirection();
            this.sr.travelTo(goDirection.x, goDirection.y); // Senior go out
        }

        if (this.jr.isTravelling() || this.sr.isTravelling()) {
            this.jr.update(dt);
            this.sr.update(dt);
            return;
        }

        if (this.door.isReached(this.sr)) {
            this.sr.exist = false;
        }

        if (!this.puzzleActive) {
            this.door.update();
            return;
        }
    }

    draw() {
        super.draw();

        this.jr.draw();
        this.sr.draw();

        if (this.puzzleActive) {
            for (let grid of this.grids) {
                grid.draw();
            }
        }

        if (debug) {
            if (this.isSolved()) {
                text("Solved", 0, 0, 100, 100);
            } else {
                text("Not solved", 0, 0, 100, 100);
            }
        }
    }

    mousePressed() {
        super.mousePressed();

        if (this.jr.isTravelling() || this.sr.isTravelling()) {
            return;
        }

        if (!this.puzzleActive) {
            if (this.door.isHovered() && !this.jr.isTravelling()) {
                let goDirection = this.door.getGoDirection();
                this.jr.travelTo(goDirection.x, goDirection.y);
                this.firstTime = false;
                return;
            }

            if (this.qfc.isHovered() && !this.jr.isTravelling()) {
                this.puzzleActive = true;
                tipsManager.deactivate();
            }

            return;
        }

        let pressed = false;

        for (let grid of this.grids) {
            if (grid.isHovered()) {
                grid.rotate();
                pressed = true;
                break;
            }
        }

        if (!pressed) {
            this.puzzleActive = false;
        }
    }

    isSolved() {
        let sum = Grid.zeros(this.gridSize);

        for (let grid of this.grids) {
            sum.add(grid);
        }

        return sum.isPerfect();
    }

    transition() {
        super.transition();
    }
}
