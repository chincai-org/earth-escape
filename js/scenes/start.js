class Start extends Scene {
    init() {
        this.storyTelling = 0;
        this.initial = true;
        this.transition = [
            {
                running: false,
                background: "menu_bg",
                done: 0,
                type: [0, 1], //+, -
                alpha: [3, 3],
                currentAlpha: [0, 255],
                dialog: false

            },
            {

                running: false,
                background: "menu_bg",
                done: 0,
                type: [0, 1], //+, -
                alpha: [2, 2],
                currentAlpha: [0, 255],
                playing: 0,
                dialog: [{
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
                    align: "left",
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

                }]

            },
            {

                running: false,
                background: "cave_bg",
                done: 0,
                type: [0, 1], //+, -
                alpha: [2, 2],
                currentAlpha: [0, 255],
                skipLastTransition: true,
                playing: 0,
                dialog:
                    [
                        {
                            name: "Kikiko",
                            text: "I TOLD YOU TO CHECK THE FUEL BEFORE WE TAKE OFF YOU CARELESS FOOL! NOW WE CRASHED INTO A CAVE IN SOME RANDOM PLANET!",
                            align: "right"
                        },
                        {
                            name: "Polikino",
                            text: "Sorry sir.",
                            align: "left"
                        },
                        {
                            name: "Kikiko",
                            text: "Where are we?",
                            align: "right"
                        },
                        {
                            name: "Polikino",
                            text: "We are in planet Earth.",
                            align: "left"
                        },
                        {
                            name: "Kikiko",
                            text: "Hm, looks like the spaceship is slightly broken, let us find resources on this planet to fix this spacesship. Go explore and find something useful for me.",
                            align: "right"
                        },
                        {
                            name: "Polikino",
                            text: "Ok.",
                            align: "left"
                        },
                    ]

            }
        ];
        this.initial = false;
        this.transition[0].running = true;
    }
    draw() {
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
            image(images[this.transition[this.storyTelling].background], 0, 0, canvasWidth, canvasHeight);
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
        if (this.transition[this.storyTelling].playing == 0 && !this.transition[this.storyTelling].running) {
            dialougeManager.play(this.transition[this.storyTelling].dialog);
            this.transition[this.storyTelling].playing = 1;
        }
        if (!dialougeManager.active && this.transition[this.storyTelling].playing == 1 && !this.transition[this.storyTelling].running && this.transition[this.storyTelling].skipLastTransition) {
            this.next();
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
