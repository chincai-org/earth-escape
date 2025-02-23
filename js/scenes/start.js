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
                text: "What?! What just happened? Why are we spinning?!",
                align: "right"
            },
            {
                name: "Polikino",
                text: "Uh... I think the anti-gravity stabilizer just gave out. Did we... skip the maintenance check again?",
                align: "left"
            },
            {
                name: "Kikiko",
                text: "THE STABILIZER?! ARE YOU TELLING ME WE'RE FLOATING AROUND LIKE A DRUNK ASTEROID?! AHHHHHHHHHH!",
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
            sound.play("backgroundmusic");
        } else {
            if (!dialougeManager.active) {
                this.done = true;
            }
        }
    }

    keyPressed() {
        if (!dialougeManager.active) {
            this.done = true;
        }
    }

    resetStyle() {
        textAlign(LEFT, BASELINE);
        textStyle(NORMAL);
        textSize(12);
        fill(0);
    }
}
