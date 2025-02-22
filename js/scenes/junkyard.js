class junkyard extends Scene {
    init() {
        this.items = [
            [50, 50, "toolbox"],
            [100, 100, "shit"]
        ];
        this.prompt;
        this.promptTime;
    }

    update() {}

    draw() {
        image(images["junkyard_bg"], 0, 0, canvasWidth, canvasHeight);
        image(images.trash_bg, 0, 0, canvasWidth, canvasHeight);

        // noStroke();
        // fill(255, 255, 255);
        // for (let item of this.items) ellipse(item[0], item[1], 40);

        // textAlign(CENTER, CENTER);
        // const TEXTSIZE = 15;
        // const ORIGINAL_PROMPT_TIME = 60;
        // textSize(TEXTSIZE);
        // fill(
        //     "rgba(255,255,255," + this.promptTime / ORIGINAL_PROMPT_TIME + ")"
        // );
        // if (this.prompt)
        //     text(this.prompt, canvasWidth / 2, TEXTSIZE + this.promptTime);
    }

    transition() {
        this.jr.travelTo(0.2 * canvasWidth, 0.5 * canvasHeight);
    }
}
