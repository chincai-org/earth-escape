const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const scenes = [new Wiring(), new LogicGates(), new Puzzle(), new Cave()];

let currentSceneIndex = -1;
let currentCharacter = 0;
let lastUpdate = -1;

const dialougeManager = new DialougeManager();

let dialog = [
    {
        name: "Kikiko",
        text: "Nothing can go wrong... right?",
        align: "right"
    },
    {
        name: "Polikino",
        text: "I hope so...",
        align: "left"
    }
];

function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("main");
    background(255);

    dialougeManager.play(dialog);
}

function preload() {
    menu_bg = loadImage("assets/menu.png");
}

function draw() {
    background(255);

    let dt = getDeltaTime();

    if (currentSceneIndex >= 0) {
        scenes[currentSceneIndex].update(dt);
        scenes[currentSceneIndex].draw();
        scenes[currentSceneIndex].lateUpdate();
    } else {
        image(menu_bg, 0, 0, canvasWidth, canvasHeight);

        dialougeManager.update();
        if (dialougeManager.active) {
            dialougeManager.draw();
            dialougeManager.lateUpdate();
        }
    }
}

function keyPressed() {
    // 0-9
    if (keyCode >= 48 && keyCode <= 57) {
        transition(keyCode - 48);
    }
}

function mousePressed() {
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

function transition(n) {
    currentSceneIndex = n;
    dialougeManager.reset();
}
