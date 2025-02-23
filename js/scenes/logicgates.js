const GATE_TYPES = {
    INPUT: -1,
    OUTPUT: -2,
    NEUTRAL: 0,
    AND: 1,
    OR: 2,
    NOT: 3
};

const logicGateGridSize = 4;

class Gate {
    constructor(type, layer, y) {
        this.y = y;
        this.layer = layer;
        this.type = type;
        this.value = 0;

        this.color = [0, 0, 0];

        this.updateColor();

        this.child = [];
        this.inputs = [];

        this.updateLimit();

        this.tileSize = 128;
        this.gridSize = logicGateGridSize;
        this.gridTotalSize = this.gridSize * this.tileSize;

        this.displayX =
            canvasWidth / 2 - this.gridTotalSize / 2 + layer * this.tileSize;
        this.displayY =
            canvasHeight / 2 - this.gridTotalSize / 2 + y * this.tileSize;

        if (type == GATE_TYPES.INPUT) {
            this.displayX =
                canvasWidth / 2 - this.gridTotalSize / 2 - this.tileSize - 20;
            this.displayY =
                canvasHeight / 2 -
                this.gridTotalSize / 2 +
                y * 3 * this.tileSize;
        } else if (type == GATE_TYPES.OUTPUT) {
            this.displayX = canvasWidth / 2 + this.gridTotalSize / 2 + 20;
            this.displayY = canvasHeight / 2 - this.tileSize / 2;
        }
    }

    updateColor() {
        switch (this.type) {
            case GATE_TYPES.INPUT:
                this.color = [0, 255, 0];
                break;
            case GATE_TYPES.OUTPUT:
                this.color = [255, 0, 0];
                break;
            case GATE_TYPES.AND:
                this.color = [0, 0, 255];
                break;
            case GATE_TYPES.OR:
                this.color = [0, 255, 255];
                break;
            case GATE_TYPES.NOT:
                this.color = [255, 0, 255];
                break;
            case GATE_TYPES.NEUTRAL:
                this.color = [0, 0, 0];
                break;
        }
    }

    updateLimit() {
        this.inputLimit = 1;

        if (this.type == GATE_TYPES.AND || this.type == GATE_TYPES.OR) {
            this.inputLimit = 2;
        }
    }

    toggleValue() {
        this.value = 1 - this.value;
    }

    refresh() {
        this.updateColor();
        this.updateLimit();

        for (let input of this.inputs) {
            for (let i = 0; i < input.child.length; i++) {
                let child = input.child[i];
                if (this.equals(child)) {
                    input.child.splice(i, 1);
                }
            }
        }

        this.inputs = [];
    }

    appendChild(gate) {
        // console.log("bruh");
        if (gate.inputs.length < gate.inputLimit) {
            this.child.push(gate);
            gate.inputs.push(this);
        }
    }

    draw(size, selected) {
        for (let child of this.child) {
            stroke(0);
            strokeWeight(5);
            line(
                this.displayX + this.tileSize / 2,
                this.displayY + this.tileSize / 2,
                child.displayX + child.tileSize / 2,
                child.displayY + child.tileSize / 2
            );
        }

        fill(this.color);

        let extra = 1;

        if (this.equals(selected)) {
            extra = 1.5;
        } else if (this.isHovered() && selected) {
            if (this.layer - selected.layer == 1) {
                extra = 1.2;
            }
        }

        noStroke();
        ellipse(
            this.displayX + this.tileSize / 2,
            this.displayY + this.tileSize / 2,
            size * extra
        );

        stroke(0);
        strokeWeight(1);
        fill(255, 255, 255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(
            this.value,
            this.displayX + this.tileSize / 2,
            this.displayY + this.tileSize / 2
        );
    }

    loop() {
        this.type = (this.type + 1) % 4;

        this.refresh();
    }

    isHovered() {
        return (
            mouseX > this.displayX &&
            mouseX < this.displayX + this.tileSize &&
            mouseY > this.displayY &&
            mouseY < this.displayY + this.tileSize
        );
    }

    equals(other) {
        if (!other) {
            return false;
        }

        return this.layer == other.layer && this.y == other.y;
    }

    updateValue() {
        let a = this.inputs[0]?.value || 0;
        let b = this.inputs[1]?.value || 0;

        switch (this.type) {
            case GATE_TYPES.AND:
                this.value = a & b;
                break;
            case GATE_TYPES.OR:
                this.value = a | b;
                break;
            case GATE_TYPES.NOT:
                this.value = 1 - a;
                if (this.inputs.length == 0) this.value = 0;
                break;
            case GATE_TYPES.OUTPUT:
                this.value = a;
                break;
            case GATE_TYPES.NEUTRAL:
                this.value = a;
                break;
        }
    }

    clone() {
        let gate = new Gate(this.type, this.layer, this.y);
        gate.value = this.value;

        return gate;
    }
}

class LogicGates extends Scene {
    init() {
        this.gates = [];
        this.selected = null;

        this.selected = null;

        this.initGates();

        this.solved = false;

        this.jrStart = { x: 0, y: 0.5 };
        this.jrEnd = { x: 0.2, y: 0.5 };

        this.srStart = { x: 0.8, y: 0.5 };
        this.srEnd = { x: 0.8, y: 0.5 };

        this.door = new Door(this.jr);
        this.door
            .setTransition(CAVE)
            .setBox(
                0.43854748603351956,
                0.540920716112532,
                0.1403631284916201,
                0.22122762148337596
            )
            .setGoDirection(0.04120111731843575, 0.5127877237851662)
            .setImages("door", "door_img");

        this.cpu = new Interactable(this.jr);
        this.cpu.setBox(
            0.4371508379888268,
            0.40281329923273657,
            0.1180167597765363,
            0.1969309462915601
        );

        this.interactables.push(this.door);
        this.interactables.push(this.cpu);

        this.dialog = [
            {
                name: "Kikiko",
                text: "Well, well, well, such perfect timing",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "I was just figuring out what's wrong with our CPU",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "I think it's a logic gate problem",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "Turns out the XOR gate is destroyed",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "We need to recreate it to fix the CPU",
                align: "right"
            },
            {
                name: "Polikino",
                text: "Erm,.. English please?",
                align: "left"
            },
            {
                name: "Kikiko",
                text: "Oh right, I forgot you're not a computer scientist",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "Listen, I will only say this once",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "There are 6 columns of gates",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "The first column are inputs",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "Which value is either 0 or 1",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "You can toggle the inputs however you like.",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "The last column is the output",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "In the middle there are 4 columns of gates",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "Which are neutral by default",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "You can change the gates by clicking them",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "You can only connnect gates to the next column",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "Different gates have different functions",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "AND gate (Dark blue) will output 1 if both inputs connected to the gate are 1",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "OR gate (Light blue) will output 1 if either of the inputs connected to the gate are 1",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "NOT gate (Magenta) will inverse the input (1 to 0, 0 to 1)",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "You need to recreate the XOR gate",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "Which will output 1 if the inputs are different, and 0 if the inputs are the same",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "That's all I'm gonna teach you. Figure it out yourself. Good luck!",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "Oh, and don't forget to toggle the inputs to test the gate",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "And we require soldering iron to fix the CPU, don't ask me why, it is what it is.",
                align: "right"
            },
            {
                name: "Kikiko",
                text: "You can do it before going to the yard again.",
                align: "right"
            },
            {
                name: "Polikino",
                text: "I don't understand a thing you said",
                align: "left"
            }
        ];

        this.firstTime = true;
        this.dialogStarted = false;
        this.dialogEnded = false;
        this.puzzleActive = false;
    }

    initGates() {
        this.input_a = new Gate(GATE_TYPES.INPUT, -1, 0);
        this.input_b = new Gate(GATE_TYPES.INPUT, -1, 1);

        this.output = new Gate(GATE_TYPES.OUTPUT, logicGateGridSize, 0);

        this.gates.push([this.input_a, this.input_b]);

        for (let layer = 0; layer < logicGateGridSize; layer++) {
            let currLayer = [];
            for (let y = 0; y < logicGateGridSize; y++) {
                currLayer.push(new Gate(GATE_TYPES.NEUTRAL, layer, y));
            }

            this.gates.push(currLayer);
        }

        this.gates.push([this.output]);
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

        this.updateGates();
    }

    updateGates(gates = null) {
        gates = gates || this.gates;
        for (let layer of gates.slice(1)) {
            for (let gate of layer) {
                gate.updateValue();
            }
        }
    }

    draw() {
        image(images.room, 0, 0, canvasWidth, canvasHeight);

        super.draw();

        this.jr.draw();
        this.sr.draw();

        if (this.puzzleActive) {
            if (this.selected) {
                stroke(0);
                strokeWeight(10);
                line(
                    this.selected.displayX + this.selected.tileSize / 2,
                    this.selected.displayY + this.selected.tileSize / 2,
                    mouseX,
                    mouseY
                );
            }

            this.drawGates();
        }

        if (debug) {
            if (this.isSolved()) {
                text("Solved", 0, 0, 100, 100);
            } else {
                text("Not solved", 0, 0, 100, 100);
            }
        }
    }

    drawGates() {
        for (let layer of this.gates) {
            for (let gate of layer) {
                gate.draw(30, this.selected);
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

            if (this.cpu.isHovered() && !this.sr.isTravelling()) {
                this.puzzleActive = true;
                return;
            }

            return;
        }

        if (this.puzzleActive) {
            let gate = this.getHovered();

            if (gate == null) {
                this.puzzleActive = false;
                return;
            }

            if (this.selected) {
                this.selected.appendChild(gate);
                this.selected = null;
            } else {
                this.selected = gate;
            }
        }
    }

    mouseReleased() {
        if (!this.selected) {
            return;
        }

        let hovered = this.getHovered();

        if (hovered) {
            if (this.selected.equals(hovered)) {
                if (this.selected.type == GATE_TYPES.INPUT) {
                    this.selected.toggleValue();
                } else if (this.selected.type == GATE_TYPES.OUTPUT) {
                    this.selected.refresh();
                } else {
                    this.selected.loop();
                }
            } else if (hovered.layer - this.selected.layer == 1) {
                this.selected.appendChild(hovered);
            }
        }

        this.selected = null;
    }

    getHovered() {
        for (let layer of this.gates) {
            for (let gate of layer) {
                if (gate.isHovered()) {
                    return gate;
                }
            }
        }

        return null;
    }

    isSolved() {
        // Test if gates recreated XOR
        let foo = this.input_a.value;
        let bar = this.input_b.value;

        let result = true;

        let testCases = [
            [0, 0, 0],
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0]
        ];

        for (let [a, b, o] of testCases) {
            this.input_a.value = a;
            this.input_b.value = b;

            this.updateGates();

            if (this.output.value != o) {
                result = false;
                break;
            }
        }

        this.input_a.value = foo;
        this.input_b.value = bar;

        this.updateGates();

        return result;
    }

    cloneGates() {
        let gates = [];

        for (let layer of this.gates) {
            let currLayer = [];

            for (let gate of layer) {
                currLayer.push(gate.clone());
            }

            gates.push(currLayer);
        }
    }

    transition() {
        super.transition();
    }
}
