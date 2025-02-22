class Start extends Scene {
    init() {
        this.storyTelling = 0;
        this.initial = true;

        this.dialog = [
            {
                name: "Kikiko",
                text: "Drive quickly, I am going to be late for a meeting!!!",
                align: "right"
            },
            {
                name: "Polikino",
                text: "Yes sir. *Press pedal harder*",
                align: "left"
            },
            {
                name: "???",
                text: "*dong dong dong dong*",
                align: "left"
            },
            {
                name: "Kikiko",
                text: "What just happened?",
                align: "right"
            },
            {
                name: "Polikino",
                text: "I think the spaceship is out of fuel.",
                align: "left"
            },
            {
                name: "Kikiko",
                text: "What!? AHHHHHHHHHH",
                align: "right"
            }
        ];

        this.started = false;
        this.done = false;
    }

    draw() {
        image(images.menu_bg, 0, 0, canvasWidth, canvasHeight);

        // fill(255, this.transition[this.storyTelling].currentAlpha[0]);

        if (!this.started) {
            textSize(30);
            textFont("comic sans");
            textStyle(BOLD);
            textAlign(CENTER, BOTTOM);
            text(
                "Click anywhere to begin",
                0,
                -(canvasHeight / 15),
                canvasWidth,
                canvasHeight
            );
            this.resetStyle();
        }
    }

    lateUpdate() {
        if (this.done && !effect.active) {
            // console.log("transition!");
            transition(1, 2, 2);
        }
    }

    mousePressed() {
        if (!this.started) {
            this.started = true;
            dialougeManager.play(this.dialog);
        } else {
            if (!dialougeManager.active) {
                this.done = true;
            }
        }
    }

    resetStyle() {
        textAlign(LEFT, BASELINE);
        textStyle(NORMAL);
        textSize(12);
        fill(0);
    }
}
