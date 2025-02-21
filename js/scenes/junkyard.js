class junkyard extends Scene {
    init() {
        this.items = [[50, 50, "toolbox"], [100, 100, "shit"]];
        this.inventory;
        this.prompt;
        this.promptTime;
    }

    update() {
        if (mouseIsPressed) {
            for (let i = 0; i < this.items.length; ++i) {
                const MOUSE_TOUCH_ITEM = Math.hypot(this.items[i][0] - mouseX, this.items[i][1] - mouseY) < 20;
                if (MOUSE_TOUCH_ITEM) {
                    if (!this.inventory) {
                        this.inventory = this.items[i][2];
                        this.items.splice(i, 1);
                        break;
                    }
                    this.prompt = "Inventory is full";
                    this.promptTime = 60;

                }
            }
        }

        if (--this.promptTime < 0) this.prompt = null;

    }

    draw() {
        background(0)

        noStroke();
        fill(255, 255, 255);
        for (let item of this.items)
            ellipse(item[0], item[1], 40);

        textAlign(CENTER, CENTER);
        const TEXTSIZE = 15;
        const ORIGINAL_PROMPT_TIME = 60
        textSize(TEXTSIZE);
        fill("rgba(255,255,255," + this.promptTime / ORIGINAL_PROMPT_TIME + ")");
        if (this.prompt)
            text(this.prompt, canvasWidth / 2, TEXTSIZE + this.promptTime);
    }
}
