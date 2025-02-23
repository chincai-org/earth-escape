/**
 * @param {CallableFunction} callable
 */
function virtualEdit(callable) {
    push();
    callable();
    pop();
}

function dialogBox(txt, name, align) {
    fill(252, 187, 3);
    noStroke();

    const BoxY = canvasHeight * 0.75;
    const BoxHeight = canvasHeight * 0.23;

    rect(canvasWidth * 0.1, BoxY, canvasWidth * 0.8, BoxHeight, 10, 10, 10, 10);
    noStroke();

    const padding = canvasWidth * 0.008;

    fill(252, 103, 3);
    rect(
        canvasWidth * 0.108,
        padding + BoxY,
        canvasWidth * 0.784,
        BoxHeight - canvasWidth * 0.016,
        10,
        10,
        10,
        10
    );
    fill(0);
    textFont("Comic Sans", 20);
    textStyle(NORMAL);
    textAlign(LEFT);
    text(
        txt,
        canvasWidth * 0.116,
        canvasWidth * 0.016 + BoxY,
        canvasWidth * 0.768,
        BoxHeight - canvasWidth * 0.032 - canvasHeight * 0.03
    );
    textAlign(RIGHT);
    text(
        "<Click to proceed>",
        canvasWidth * 0.116,
        BoxY + canvasHeight * 0.2 - canvasWidth * 0.016,
        canvasWidth * 0.768,
        canvasHeight * 0.23 - canvasWidth * 0.032
    );

    textAlign(LEFT);
    if (align == "left") {
        fill(252, 187, 3);
        rect(
            canvasWidth * 0.2,
            canvasHeight * 0.68,
            canvasWidth * 0.2,
            canvasHeight * 0.0703,
            10,
            10,
            0,
            0
        );
        fill(252, 103, 3);
        rect(
            canvasWidth * 0.208,
            canvasHeight * 0.68 + padding,
            canvasWidth * 0.184,
            canvasHeight * 0.07 - padding,
            10,
            10,
            0,
            0
        );
        fill(0);
        textStyle(BOLD);
        text(
            name,
            canvasWidth * 0.216,
            canvasHeight * 0.68 + 2 * padding,
            canvasWidth * 0.784,
            BoxHeight - canvasWidth * 0.016
        );
    } else {
        fill(252, 187, 3);
        rect(
            canvasWidth * 0.6,
            canvasHeight * 0.68,
            canvasWidth * 0.2,
            canvasHeight * 0.0703,
            10,
            10,
            0,
            0
        );
        fill(252, 103, 3);
        rect(
            canvasWidth * 0.608,
            canvasHeight * 0.68 + padding,
            canvasWidth * 0.184,
            canvasHeight * 0.07 - padding,
            10,
            10,
            0,
            0
        );
        fill(0);
        textStyle(BOLD);
        text(
            name,
            canvasWidth * 0.616,
            canvasHeight * 0.68 + 2 * padding,
            canvasWidth * 0.784,
            BoxHeight - canvasWidth * 0.016
        );
    }
}

class DialougeManager {
    constructor() {
        this.dialouges = [];
        this.currentDialougeIndex = 0;
        this.currentCharacter = 0;
        this.active = false;
        this.template = "";
    }

    reset() {
        this.dialouges = [];
        this.currentDialougeIndex = 0;
        this.currentCharacter = 0;
        this.active = false;
    }

    play(dialouges, template = "") {
        this.dialouges = dialouges;
        this.currentDialougeIndex = 0;
        this.currentCharacter = 0;
        this.active = true;
        this.template = template;
    }

    update() {
        if (!this.active) return;

        if (this.currentDialougeIndex >= this.dialouges.length) {
            this.active = false;
            return;
        }

        // let dialog = this.dialouges[this.currentDialougeIndex];

        // if (this.currentCharacter >= dialog.text.length) {
        //     this.currentCharacter = 0;
        //     this.currentDialougeIndex++;
        // }
    }

    lateUpdate() {
        this.currentCharacter += (Math.random() / 2) * 1.5;
        this.currentCharacter = Math.min(
            this.currentCharacter,
            this.dialouges[this.currentDialougeIndex].text.length
        );
    }

    mousePressed() {
        this.continue();
    }

    keyPressed() {
        if (keyCode == 32) {
            this.continue();
        }
    }

    continue() {
        // Finish typewriter effect if dialogue on-going, else move to next dialogue
        let currentDialog = this.dialouges[this.currentDialougeIndex];
        let dialogText = currentDialog.text;

        if (this.currentCharacter < dialogText.length) {
            this.currentCharacter = dialogText.length;
        } else {
            this.currentCharacter = 0;
            this.currentDialougeIndex++;
        }
    }

    draw() {
        let dialog = this.dialouges[this.currentDialougeIndex];
        let currentDialog = dialog.text
            .substring(0, this.currentCharacter)
            .replaceAll("$$", this.template);
        dialogBox(currentDialog, dialog.name, dialog.align || "left");
    }
}

class TipsManager {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.txt = "";
        this.arrow = false;
        this.color = [255, 255, 0]; // yellow
        this.active = false;

        this.arrow_position = 0;
        this.direction = 1;
        this.animation_speed = 0.05;
    }

    setColor(r, g, b) {
        this.color = [r, g, b];
    }

    show(x, y, txt, arrow = true) {
        this.x = x;
        this.y = y;
        this.txt = txt;
        this.arrow = arrow;
        this.active = true;
    }

    deactivate() {
        this.active = false;
        this.setColor(255, 255, 0);
    }

    update(dt) {
        if (!this.active) return;

        // Arrow position oscillate between 0 and 1
        this.arrow_position += this.direction * this.animation_speed;
        if (this.arrow_position >= 1 || this.arrow_position <= 0) {
            this.direction *= -1;
        }
    }

    draw() {
        virtualEdit(() => {
            // console.log(this.x, this.y);
            // Draw the text
            translate(this.x, this.y);
            fill(...this.color); // yellow
            // textAlign(CENTER, CENTER);
            stroke(0, 0, 0);
            textSize(20);

            let width = textWidth(this.txt);
            let height = textAscent() + textDescent();

            text(this.txt, -width / 2, -height / 2);

            if (this.arrow) {
                // Draw upside down triangle with a constant size under the text
                fill(this.color); // yellow
                beginShape();
                vertex(-10, 0 + this.arrow_position * 10);
                vertex(10, 0 + this.arrow_position * 10);
                vertex(0, 10 + this.arrow_position * 10);
                endShape(CLOSE);
            }
        });
    }
}
