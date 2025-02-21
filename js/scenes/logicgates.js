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

        if (this.type == GATE_TYPES.INPUT) {
            fill(0);
            textSize(32);
            textAlign(CENTER, CENTER);
            text(
                this.value,
                this.displayX + this.tileSize / 2,
                this.displayY + this.tileSize / 2
            );
        }
    }

    loop() {
        this.type += 1;
        if (this.type > GATE_TYPES.NOT) {
            this.type = GATE_TYPES.NEUTRAL;
        }

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
}

class LogicGates extends Scene {
    init() {
        this.gates = [];
        this.selected = null;

        this.selected = null;

        this.initGates();
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

    draw() {
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

    drawGates() {
        for (let layer of this.gates) {
            for (let gate of layer) {
                gate.draw(30, this.selected);
            }
        }
    }

    mousePressed() {
        let gate = this.getHovered();

        if (this.selected) {
            this.selected.appendChild(gate);
            this.selected = null;
        } else {
            this.selected = gate;
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
                } else if (this.selected.type != GATE_TYPES.OUTPUT) {
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
}
