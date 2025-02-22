const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
let inventory;
let hand;

const scenes = [
    new Wiring(),
    new LogicGates(),
    new Puzzle(),
    new Cave(),
    new Start(),
    new screwDriver(),
    new junkyard(),
    new UfoFix()
];

let currentSceneIndex = -1;
let currentCharacter = 0;
let lastUpdate = -1;

const dialougeManager = new DialougeManager();
const tipsManager = new TipsManager();

let effect = {
    active: false
}

// let menu_bg, cave_bg, ufo_img;
let images = {};

let debug_rects = [];
let debug_dots = [];

const music = [
    {
        link: "",
        name: "music1",
        group: ""
    },
    {
        link: "",
        name: "",
        group: ""
    }
];

const sound = new Sound(music);

function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("main");
    background(255);

    //tipsManager.show(200, 200, "Click here to enter room", true);

    // scenes[4].initial = false
    // scenes[4].transition[0].running = true;
}

function preload() {
    // menu_bg = loadImage("assets/images/menu.png");
    // cave_bg = loadImage("assets/images/cave.png");
    // ufo_img = loadImage("assets/images/ufo.png");

    images = {
        menu_bg: loadImage("assets/images/menu.png"),
        cave_bg: loadImage("assets/images/cave.png"),
        ufo_img: loadImage("assets/images/ufo.png"),
        ufo_hovered_img: loadImage("assets/images/ufo_hovered.png"),
        door_img: loadImage("assets/images/door.png")
    };
}

function draw() {
    background(255);

    let dt = getDeltaTime();

    if (effect.active) {
        if (effect.m == 0) {
            background(0);
            tint(255, effect.x2);
            effect.x2 += 2
            if (effect.x2 > 255) {
                effect.x2 = 255;
                effect.active = false;
            }
        } else if (effect.m == 1) {
            background(0);
            tint(255, effect.x1);
            effect.x1 -= 2
            if (effect.x1 < 0) {
                effect.x1 = 0;
                effect.m = 0;
                currentSceneIndex = effect.next;
            }
        }
    }

    if (currentSceneIndex >= 0) {
        scenes[currentSceneIndex].update(dt);
        scenes[currentSceneIndex].draw();
        scenes[currentSceneIndex].lateUpdate();
    } else {
        image(images.menu_bg, 0, 0, canvasWidth, canvasHeight);
        ellipse(200, 200, 10, 10);
    }

    dialougeManager.update();
    if (dialougeManager.active) {
        dialougeManager.draw();
        dialougeManager.lateUpdate();
    }

    // drawTips(200, 200, "Click anywhere to continue", true);

    tipsManager.update(dt);
    if (tipsManager.active) {
        tipsManager.draw();
    }

    for (let [x, y] of debug_dots) {
        ellipse(x, y, 10, 10);
    }

    for (let [x, y, w, h] of debug_rects) {
        noFill();
        stroke(135, 206, 235);
        rect(x, y, w, h);
    }
}

function keyPressed() {
    // 0-9
    if (keyCode >= 48 && keyCode <= 57) {
        transition(keyCode - 48);
    }
    if (currentSceneIndex >= 0) {
        scenes[currentSceneIndex].keyPressed();
    }
}

function mousePressed() {
    console.log(mouseX, mouseY);

    if (keyIsDown(CONTROL)) {
        debug_dots.push([mouseX, mouseY]);

        if (debug_dots.length == 2) {
            let [x1, y1] = debug_dots[0];
            let [x2, y2] = debug_dots[1];

            let width = x2 - x1;
            let height = y2 - y1;

            debug_rects.push([x1, y1, width, height]);
            debug_dots = [];

            console.log(
                [
                    x1 / canvasWidth,
                    y1 / canvasHeight,
                    width / canvasWidth,
                    height / canvasHeight
                ].join(", ")
            );
        }
    }

    if (dialougeManager.active) {
        dialougeManager.mousePressed();
        return; // Disable any click events if dialogue is active
    }

    if (currentSceneIndex >= 0) {
        scenes[currentSceneIndex].mousePressed();
    }
}

function mouseReleased() {
    if (currentSceneIndex >= 0) {
        scenes[currentSceneIndex].mouseReleased();
    }
}

function getDeltaTime() {
    if (lastUpdate === -1) {
        lastUpdate = millis();
        return 0;
    }

    let now = millis();
    let dt = now - lastUpdate;
    lastUpdate = now;
    return dt;
}

function transition(n, time1, time2) {
    if (time1 == undefined && time2 == undefined) {
        currentSceneIndex = n;
    } else {
        effect.x1 = 255;
        effect.x2 = 0;
        effect.m = 1;
        effect.prev = currentSceneIndex;
        effect.next = n;
        effect.active = true;
    }
    dialougeManager.reset();
}
