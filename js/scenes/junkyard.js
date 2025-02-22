class junkyard extends Scene {
    init() {
        this.items = [
            [50, 50, "toolbox"],
            [100, 100, "shit"]
        ];
        this.prompt;
        this.promptTime;
    }

    update() {
        if (mouseIsPressed) {
            for (let i = 0; i < this.items.length; ++i) {
                const MOUSE_TOUCH_ITEM =
                    Math.hypot(
                        this.items[i][0] - mouseX,
                        this.items[i][1] - mouseY
                    ) < 20;
                if (MOUSE_TOUCH_ITEM) {
                    if (!hand) {
                        hand = this.items[i][2];
                        this.items.splice(i, 1);
                        break;
                    }
                    this.prompt = "Can only hold one object";
                    this.promptTime = 60;
                }
            }
        }

        if (--this.promptTime < 0) this.prompt = null;
    }

    draw() {
        image(images["junkyard_bg"], canvasWidth, canvasHeight);

        noStroke();
        fill(255, 255, 255);
        for (let item of this.items) ellipse(item[0], item[1], 40);

        textAlign(CENTER, CENTER);
        const TEXTSIZE = 15;
        const ORIGINAL_PROMPT_TIME = 60;
        textSize(TEXTSIZE);
        fill(
            "rgba(255,255,255," + this.promptTime / ORIGINAL_PROMPT_TIME + ")"
        );
        if (this.prompt)
            text(this.prompt, canvasWidth / 2, TEXTSIZE + this.promptTime);
    }

    transition() {
        hand = null;
        this.jr.travelTo(0.2 * canvasWidth, 0.5 * canvasHeight);
    }
}
