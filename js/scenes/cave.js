class Cave extends Scene {
    init() {
        this.ufo = new Interactable(this.jr);
        this.ufo
            .setImages("ufo_img", "ufo_hovered_img")
            .setBox(
                0.05411255411255411,
                0.3162162162162162,
                0.2712842712842713,
                0.31756756756756754
            );

        this.bigUFO = new Interactable(this.jr);
        this.bigUFO.setImages("big_ufo").displayNone();

        this.ufo_a = new Door(this.jr);
        this.ufo_a
            .setImages("", "big_ufo_a")
            .setTransition(WIRING)
            .setBox(
                0.6864525139664804,
                0.3657289002557545,
                0.09217877094972067,
                0.11125319693094629
            )
            .setGoDirection(0.19343575418994413, 0.4322250639386189)
            .displayNone();

        this.ufo_b = new Door(this.jr);
        this.ufo_b
            .setImages("", "big_ufo_b")
            .setTransition(PUZZLE)
            .setBox(
                0.5118715083798883,
                0.5255754475703325,
                0.0893854748603352,
                0.0959079283887468
            )
            .setGoDirection(0.19343575418994413, 0.4322250639386189)
            .displayNone();

        this.ufo_c = new Door(this.jr);
        this.ufo_c
            .setImages("", "big_ufo_c")
            .setTransition(LOGIC_GATES)
            .setBox(
                0.3100558659217877,
                0.5217391304347826,
                0.06773743016759777,
                0.10358056265984655
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
        this.interactables.push(this.caveExit);
        this.interactables.push(this.bigUFO);
        this.interactables.push(this.ufo_a);
        this.interactables.push(this.ufo_b);
        this.interactables.push(this.ufo_c);

        this.parts = [this.bigUFO, this.ufo_a, this.ufo_b, this.ufo_c];

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
                        text: "It seems like our spaceship is severely damaged. We need to repair it before we can leave this planet.",
                        align: "right"
                    },
                    {
                        name: "Kikiko",
                        text: "Let's check the control room. Follow me.",
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
                dialogEnded: false,
                allowedRooms: [WIRING]
            },
            {
                id: "junkyard_tut",
                srStart: { x: 0.9671787709497207, y: 0.5179028132992327 },
                srEnd: { x: 0.5991620111731844, y: 0.4833759590792839 },
                junkYard: true,
                allowedRooms: [JUNKYARD],
                dialog: [
                    {
                        name: "Kikiko",
                        text: "Wow, that was fast.",
                        align: "right"
                    },
                    {
                        name: "Polikino",
                        text: "Erm, actually, I'm not done yet.",
                        align: "left"
                    },
                    {
                        name: "Polikino",
                        text: "When I'm dealing with the wire, I found out that it disconnected itself everytime I try to connect it",
                        align: "left"
                    },
                    {
                        name: "Kikiko",
                        text: "Oh yeah! I forgot that it requires a plier to connect the wire.",
                        align: "right"
                    },
                    {
                        name: "Kikiko",
                        text: "But unfortunately, we don't have it.",
                        align: "right"
                    },
                    {
                        name: "Polikino",
                        text: "What should we do now?",
                        align: "left"
                    },
                    {
                        name: "Polikino",
                        text: "Wait, from where did you get that chair?",
                        align: "left"
                    },
                    {
                        name: "Kikiko",
                        text: "Oh, I was just wandering around and found a junkyard outside this cave.",
                        align: "right"
                    },
                    {
                        name: "Kikiko",
                        text: "Oh! That's it! We can find the plier in the junkyard, maybe you can test your luck there.",
                        align: "right"
                    },
                    {
                        name: "Polikino",
                        text: "Are you sure about that? Wouldn't there be species from this planet that will hunt us down?",
                        align: "left"
                    },
                    {
                        name: "Kikiko",
                        text: "I mean, I did saw a creature nearby. But it's not like we are going there very often. Just be extremely careful and visit there if we need to.",
                        align: "right"
                    },
                    {
                        name: "Kikiko",
                        text: "Nothing can go wrong, right?",
                        align: "right"
                    }
                ]
            }
        ];

        this.currentAct = -1;

        this.showBigUFO = false;
        this.nextLevel = -1;
    }

    update(dt) {
        if (this.jr.isTravelling() || this.sr.isTravelling()) {
            this.jr.update(dt);
            this.sr.update(dt);
            return;
        }

        let act = this.acts[this.currentAct];

        if (this.ufo.isReached() && !effect.active) {
            transition(this.nextLevel, 2, 3);
        } else if (this.ufo.isReached(this.sr)) {
            this.sr.exist = false;
        }

        if (act.junkYard) this.caveExit.update();

        if (act.dialog && act.dialog.length) {
            // if act has dialog
            if (!act.dialogStarted) {
                // if dialog has not started
                dialougeManager.play(act.dialog);
                act.dialogStarted = true;
            }
            // this.ufo.update();
        } else {
            act.dialogStarted = true;
            act.dialogEnded = true;
        }

        if (act.dialogStarted && !act.dialogEnded && !dialougeManager.active) {
            // Dialog just ended

            act.dialogEnded = true;

            if (act.id == "wiring_tut") {
                let goDirection = this.ufo_a.getGoDirection();
                console.log(goDirection);
                setTimeout(() => {
                    tipsManager.show(
                        0.17039106145251395 * canvasWidth,
                        0.31074168797953966 * canvasHeight,
                        "Click on the UFO.",
                        true
                    );
                }, 2000);
                this.sr.travelTo(goDirection.x, goDirection.y);
            } else if (act.id == "junkyard_tut") {
                tipsManager.show(
                    0.8603351955307262 * canvasWidth,
                    0.19309462915601022 * canvasHeight,
                    "Click on the exit.",
                    true
                );
            }
        }
    }

    mousePressed() {
        super.mousePressed();

        if (this.jr.isTravelling() || this.sr.isTravelling()) {
            return;
        }

        let act = this.acts[this.currentAct];

        if (this.showBigUFO) {
            let pressed = false;
            for (let i = 1; i < this.parts.length; i++) {
                let parts = this.parts[i];
                if (parts.isHovered() && !this.jr.isTravelling()) {
                    pressed = true;

                    if (
                        act.allowedRooms.includes(parts.transitionDestination)
                    ) {
                        let goDirection = this.ufo_a.getGoDirection();
                        this.jr.travelTo(goDirection.x, goDirection.y);
                        this.showBigUFO = false;
                        this.nextLevel = parts.transitionDestination;
                        tipsManager.deactivate();

                        this.parts.forEach(part => {
                            part.display = false;
                        });
                        break;
                    }
                }
            }

            if (!pressed) {
                // this.bigUFO.display = false;
                this.showBigUFO = false;
                this.parts.forEach(part => {
                    part.display = false;
                });
            }
            return;
        }

        if (this.ufo.isHovered()) {
            // let goDirection = this.ufo.getGoDirection();
            // this.jr.travelTo(goDirection.x, goDirection.y);

            this.displayBigUFO();

            return;
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

    displayBigUFO() {
        this.showBigUFO = true;
        this.parts.forEach(part => {
            part.display = true;
        });

        let act = this.acts[this.currentAct];

        if (act.id == "wiring_tut") {
            tipsManager.show(
                0.7304469273743017 * canvasWidth,
                0.3491048593350384 * canvasHeight,
                "Click on this room"
            );
        }
    }

    draw() {
        image(images.cave_bg, 0, 0, canvasWidth, canvasHeight);
        this.jr.draw();
        this.sr.draw();

        // if (this.showBigUFO) {
        //     image(images.big_ufo, 0, 0, canvasWidth, canvasHeight);
        // }

        super.draw();
    }

    transition(prev) {
        this.sr.exist = true;

        this.currentAct++;
        if (this.currentAct >= this.acts.length) {
            this.currentAct = this.acts.length - 1;
        }

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
