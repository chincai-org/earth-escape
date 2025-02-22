class Cave extends Scene {
    init() {
        this.ufo = new Interactable(this.jr);
        this.ufo.setImages("ufo_img", "ufo_hovered_img");

        this.ufo_a = new Door(this.jr);
        this.ufo_a
            .setImages("big_ufo", "big_ufo_a")
            .setTransition(7)
            .setBox(
                0.6864525139664804,
                0.3657289002557545,
                0.09217877094972067,
                0.11125319693094629
            )
            .setGoDirection(0.19343575418994413, 0.4322250639386189)
            .displayNone();

        // console.log(this.ufo.getGoDirection());

        this.caveExit = new Door(this.jr);
        this.caveExit
            .setTransition(JUNKYARD)
            .setBox(
                0.7360335195530726,
                0.08567774936061381,
                0.24441340782122906,
                0.7941176470588235
            );

        this.interactables.push(this.ufo);
        this.interactables.push(this.ufo_a);

        this.parts = [this.ufo_a];

        // this.jrStart = { x: 0.19343575418994413, y: 0.4322250639386189 };
        // this.jrEnd = { x: 0.2, y: 0.5 };

        this.acts = [
            {
                id: "wiring_tut",
                srStart: { x: 0.19343575418994413, y: 0.4322250639386189 },
                srEnd: { x: 0.5991620111731844, y: 0.4833759590792839 },
                dialog: [
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
                        text: "Ok, follow me to the spaceship",
                        align: "right"
                    },
                    {
                        name: "Polikino",
                        text: "Ok.",
                        align: "left"
                    }
                ],
                junkYard: false,
                dialogStarted: false,
                dialogEnded: false
            }
        ];

        this.currentAct = 0;

        this.showBigUFO = false;
    }

    update(dt) {
        if (this.jr.isTravelling() || this.sr.isTravelling()) {
            this.jr.update(dt);
            this.sr.update(dt);
            return;
        }

        let act = this.acts[this.currentAct];

        this.ufo.update();
        if (act.junkYard) this.caveExit.update();

        if (act.dialog && act.dialog.length) {
            if (!act.dialogStarted) {
                dialougeManager.play(act.dialog);
                act.dialogStarted = true;
            }
        } else {
            act.dialogStarted = true;
            act.dialogEnded = true;
        }

        if (act.dialogStarted && !act.dialogEnded && !dialougeManager.active) {
            // Dialog just ended

            act.dialogEnded = true;

            if (act.id == "wiring_tut") {
                tipsManager.show(
                    0.17039106145251395 * canvasWidth,
                    0.31074168797953966 * canvasHeight,
                    "Click on the UFO.",
                    true
                );

                let goDirection = this.ufo.getGoDirection();
                console.log(goDirection);
                this.sr.travelTo(goDirection.x, goDirection.y);
            }
        }
    }

    mousePressed() {
        super.mousePressed();

        if (this.jr.isTravelling() || this.sr.isTravelling()) {
            return;
        }

        let act = this.acts[this.currentAct];

        if (this.ufo.isHovered()) {
            this.showBigUFO = true;
            this.ufo_a.display(); // fuck
            return;
        }

        if (this.showBigUFO) {
            for (let parts of this.parts) {
                if (parts.isHovered() && !this.jr.isTravelling()) {
                    let goDirection = this.ufo.getGoDirection();
                    this.jr.travelTo(goDirection.x, goDirection.y);
                    this.showBigUFO = false;
                }
            }
        }

        if (
            this.caveExit.isHovered() &&
            !this.sr.isTravelling() &&
            act.junkYard
        ) {
            let goDirection = this.caveExit.getGoDirection();
            this.jr.travelTo(goDirection.x, goDirection.y);
        }
    }

    draw() {
        image(images.cave_bg, 0, 0, canvasWidth, canvasHeight);
        this.jr.draw();
        this.sr.draw();

        super.draw();
    }

    transition(prev) {
        if (prev == JUNKYARD) {
            this.jrStart = { x: 0.973463687150838, y: 0.5754475703324808 };
            this.jrEnd = { x: 0.6508379888268156, y: 0.5997442455242967 };
        } else {
            this.jrStart = { x: 0.19343575418994413, y: 0.4322250639386189 };
            this.jrEnd = { x: 0.43575418994413406, y: 0.4948849104859335 };
        }

        let act = this.acts[this.currentAct];
        this.srStart = act.srStart;
        this.srEnd = act.srEnd;

        super.transition();
    }
}
