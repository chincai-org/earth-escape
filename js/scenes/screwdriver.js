class screwDriver extends Scene {
    init() {
        this.screws = [];
        this.screwDiameter = 40;
        this.tick = 0;
        this.screwDriverType = -1;
        this.screwType = [
            [255, 255, 255],
            [255, 0, 0]
        ];
        this.miss = 0;
        this.spawnRate = 100;
        this.gameEnded = false;
        this.howToPlay = true;
        this.played = false;
    }
    update() {
        if (this.played) {
            this.howToPlay = false;
        }

        if (this.howToPlay) {
            if (this.tick > 750) {
                this.howToPlay = false;
            }
            this.tick++;
            return;
        }
        if (this.gameEnded) {
            this.gameEnd();
            return;
        }
        for (let i = 0; i < this.screws.length; ++i) {
            if (++this.screws[i][3] > 500) {
                this.screws.splice(i, 1);
                this.miss++;
            }
        }

        if (mouseIsPressed) {
            for (let i = 0; i < this.screws.length; ++i) {
                if (
                    Math.hypot(
                        this.screws[i][0] - mouseX,
                        this.screws[i][1] - mouseY
                    ) <
                    this.screwDiameter / 2
                ) {
                    if (this.screwDriverType === this.screws[i][2])
                        this.screws.splice(i, 1);
                    break;
                }
            }
        }

        switch (keyCode) {
            case 80: //p
                this.screwDriverType = 0;
                break;
            case 78: //n
                this.screwDriverType = 1;
                break;
            default:
                this.screwDriverType = -1;
        }

        if (this.tick % this.spawnRate == 0) {
            if (this.spawnRate > 50) {
                this.spawnRate >= 75
                    ? (this.spawnRate -= 2)
                    : this.spawnRate >= 70
                      ? --this.spawnRate
                      : (this.spawnRate -= 0.5);
            } else {
                this.spawnRate = 1;
                if (this.screws.length) return;
                this.gameEnded = true;
            }
            let X;
            let Y;
            let screw;
            do {
                X = this.randint(canvasWidth - 80);
                Y = this.randint(canvasHeight - 80);
                screw = this.randint(this.screwType.length);
            } while (
                this.screws.some(
                    ([x, y]) =>
                        Math.hypot(x - X, y - Y) <= 1.1 * this.screwDiameter
                )
            );
            this.screws.push([X + 40, Y + 60, screw, 0]);
        }
        ++this.tick;
    }
    randint(max) {
        return Math.floor(Math.random() * max);
    }

    draw() {
        background(0);
        textSize(30);
        textStyle(NORMAL);
        if (this.howToPlay) {
            fill(255, 255, 255);
            textAlign(CENTER, CENTER);
            if (this.tick < 250) {
                text("Screwdriver game", canvasWidth / 2, canvasHeight / 2);
                text(
                    "Screw the screws by clicking on the screws with the correct screwdriver",
                    canvasWidth / 2,
                    canvasHeight / 2 + 60
                );
                text(
                    "Press q to quit game",
                    canvasWidth / 2,
                    canvasHeight / 2 + 90
                );
                return;
            } else if (this.tick < 500) {
                text(
                    "Press P to switch to phillip screwdriver type.(Positive symbol)",
                    canvasWidth / 2,
                    canvasHeight / 2
                );
                text(
                    "Press N to switch to slotted screwdriver type.(Negative symbol)",
                    canvasWidth / 2,
                    canvasHeight / 2 + 60
                );
            } else if (this.tick < 600) {
                text("3", canvasWidth / 2, canvasHeight / 2);
            } else if (this.tick < 650) {
                text("2", canvasWidth / 2, canvasHeight / 2);
            } else if (this.tick < 700) {
                text("1", canvasWidth / 2, canvasHeight / 2);
            }
            return;
        }
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        text(
            "Miss: " +
                this.miss +
                ", Selected " +
                (this.screwDriverType == 0 ? "N" : "P"),
            canvasWidth / 2,
            30
        );
        noStroke();
        for (let screw of this.screws) {
            ellipse(screw[0], screw[1], this.screwDiameter);
            image(
                screw[2] == 1 ? images.negative_screw : images.positive_screw,
                screw[0] - this.screwDiameter / 2,
                screw[1] - this.screwDiameter / 2,
                this.screwDiameter,
                this.screwDiameter
            );
        }
    }

    gameEnd() {
        if (!effect.active) {
            transition(CAVE, 2, 2);
            isJuniorMiss = this.miss;
            this.played = true;
            this.gameEnded = false;
        }
    }

    isSolved() {
        if (this.miss) return false;
        return true;
    }

    keyPressed() {
        if (keyCode == 81 && !effect.active) {
            transition(CAVE, 2, 2);
        }
    }
}
