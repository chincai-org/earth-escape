class Start extends Scene {
    init() {
        this.storyTelling = 0;
        this.initial = true;
        this.transition = [
            {

                running: false,
                done: 0,
                type: [0, 1], //+, -
                alpha: [3, 3],
                currentAlpha: [0, 255],
                dialog: false

            },
            {

                running: false,
                done: 0,
                type: [0, 1], //+, -
                alpha: [2, 2],
                currentAlpha: [0, 255],
                playing: 0,
                dialog:
                    [
                        {
                            name: "Name",
                            text: "Text",
                            align: "left"
                        },
                        {
                            name: "Name2",
                            text: "Text2",
                            align: "right"
                        },
                        {
                            name: "Name3",
                            text: "Text3",
                            align: "left"
                        }
                    ]

            }
        ];
    }
    draw() {
        console.log("hello");
        background(0);
        let animation = this.transition[this.storyTelling];

        if (animation.running) {
            if (animation.done == 0) {
                tint(255, this.transition[this.storyTelling].currentAlpha[0]);
                this.transition[this.storyTelling].currentAlpha[0] += this.transition[this.storyTelling].alpha[0];
                if (this.transition[this.storyTelling].currentAlpha[0] >= 255) {
                    this.transition[this.storyTelling].currentAlpha[0] = 255;
                    tint(255, 255);
                    this.transition[this.storyTelling].done += 1;
                    this.transition[this.storyTelling].running = false;
                }
            } else if (animation.done == 1) {
                tint(255, this.transition[this.storyTelling].currentAlpha[1]);
                this.transition[this.storyTelling].currentAlpha[1] -= this.transition[this.storyTelling].alpha[1];
                if (this.transition[this.storyTelling].currentAlpha[1] <= 0) {
                    this.transition[this.storyTelling].currentAlpha[1] = 0;
                    tint(255, 0);
                    this.transition[this.storyTelling].done += 1;
                    this.transition[this.storyTelling].running = false;
                    this.storyTelling += 1;
                    this.transition[this.storyTelling].running = true;
                }
            }
        }

        if (!this.initial) {
            image(menu_bg, 0, 0, canvasWidth, canvasHeight);
            if (this.storyTelling == 0) {
                fill(255, this.transition[this.storyTelling].currentAlpha[0]);
                textSize(30);
                textFont("comic sans");
                textStyle(BOLD);
                textAlign(CENTER, BOTTOM);
                text("Click anywhere to begin", 0, -(canvasHeight / 15), canvasWidth, canvasHeight);
                this.resetStyle(); 
            }
        }
        if (this.transition[this.storyTelling].playing == 0) {
            dialougeManager.play(this.transition[this.storyTelling].dialog);
            this.transition[this.storyTelling].playing = 1;
        } else if (this.transition[this.storyTelling].playing == 1 && !this.transition[this.storyTelling].running) {
            dialougeManager.update();
            if (dialougeManager.active) {
                dialougeManager.draw();
                dialougeManager.lateUpdate();
            } else {
                dialougeManager.reset();
            }
        }


    }
    next() {
        console.log(this.transition.length, this.storyTelling);
        this.transition[this.storyTelling].running = true;
    }
    mousePressed() {
        super.mousePressed();
        this.next();
    }
    resetStyle() {
        textAlign(LEFT, BASELINE);
        textStyle(NORMAL);
        textSize(12);
        fill(0);
    }
}