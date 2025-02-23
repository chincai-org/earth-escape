class junkyard extends Scene {
    init() {
        this.jrStart = { x: 0, y: 0.6854219948849105 };
        this.jrEnd = { x: 0.2, y: 0.6854219948849105 };

        this.signBoard = new Interactable(this.jr);
        this.signBoard
            .setImages("cavedive_img", "cavedive_hovered_img")
            .setBox(
                0.002094972067039106,
                0.2864450127877238,
                0.08449720670391062,
                0.2289002557544757
            );
        // .setGoDirection(0.5, 0.5);

        this.invisibleDoor = new Door(this.jr);
        this.invisibleDoor
            .setBox(
                0,
                0.6112531969309463,
                0.06075418994413408,
                0.1534526854219949
            )
            .setTransition(CAVE)
            .setGoDirection(0.029329608938547486, 0.6841432225063938);

        this.items = {
            [screwdriver]: new Interactable(this.jr)
                .setImages("screwdriver_img", "")
                .setBox(0, 0, 0, 0),
            [superglue]: new Interactable(this.jr)
                .setImages("superglue_img", "")
                .setBox(
                    0.45321229050279327,
                    0.49232736572890023,
                    0.02723463687150838,
                    0.0319693094629156
                ),
            [solderingIron]: new Interactable(this.jr)
                .setImages("soldering_iron_img", "")
                .setBox(
                    0.12569832402234637,
                    0.4782608695652174,
                    0.034217877094972066,
                    0.04859335038363171
                ),
            [plier]: new Interactable(this.jr)
                .setImages("plier_img", "")
                .setBox(
                    0.5579608938547486,
                    0.9143222506393862,
                    0.039804469273743016,
                    0.06265984654731457
                ),
            "washingMachine": new Interactable(this.jr).setImages("Washing_machine", ""),
            "carDoor": new Interactable(this.jr).setImages("Car_door", ""),
            "wheel": new Interactable(this.jr).setImages("Wheel", ""),
            "stinkyClothes": new Interactable(this.jr).setImages("Stinky_clothes", ""),
            "radioBox": new Interactable(this.jr).setImages("Radiobox", ""),
            "boxOfBottle": new Interactable(this.jr).setImages("Box_of_bottles", ""),
            "metalPlates": new Interactable(this.jr).setImages("Metal_plates", "")
        };

        this.interactables.push(this.signBoard);
        this.interactables.push(this.invisibleDoor);

        for (let [key, item] of Object.entries(this.items)) {
            this.interactables.push(item);
        }

        this.firstTime = true;

        this.dialog = [
            {
                name: "Polikino",
                text: "Hmm, this must be the junkyard that Mr.K told me about. I should look around for some useful stuff.",
                align: "left"
            },
            {
                name: "Polikino",
                text: "It appears I have to be wise in choosing the items I need. I can only carry one item at a time.",
                align: "left"
            }
        ];

        this.found = false;

        this.visitCount = 0;
    }

    update(dt) {
        if (this.jr.isTravelling()) {
            this.jr.update(dt);
            return;
        }

        this.invisibleDoor.update();

        if (this.found) {
            let goDirection = this.invisibleDoor.getGoDirection();
            this.jr.travelTo(goDirection.x, goDirection.y);
            return;
        }

        if (this.firstTime) {
            dialougeManager.play(this.dialog);
            this.firstTime = false;
            return;
        }

        for (let [key, item] of Object.entries(this.items)) {
            item.update(dt);
        }
    }

    draw() {
        image(images["junkyard_bg"], 0, 0, canvasWidth, canvasHeight);
        image(images.trash_bg, 0, 0, canvasWidth, canvasHeight);

        this.jr.draw();

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

        super.draw();
    }

    mousePressed() {
        for (let [itemName, item] of Object.entries(this.items)) {
            if (item.isHovered()) {
                inventory.push(itemName);
                item.startFlying = true;
                // tipsManager.setColor(0, 0, 0);
                tipsManager.show(mouseX, mouseY, `${itemName} +1`, false);
                this.found = true;

                delete this.items[itemName];

                for (let i = 0; i < this.interactables.length; i++) {
                    if (this.interactables[i].equals(item)) {
                        this.interactables.splice(i, 1);
                        break;
                    }
                }

                return;
            }
        }

        if (this.signBoard.isHovered()) {
            let goDirection = this.invisibleDoor.getGoDirection();
            inventory.push("nothing");
            this.jr.travelTo(goDirection.x, goDirection.y);
            return;
        }
    }

    transition() {
        // this.jr.travelTo(0.2 * canvasWidth, 0.5 * canvasHeight);
        super.transition();
        this.found = false;
        this.visitCount++;
    }
}
