const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const scenes = [new Wiring(), new LogicGates(), new Puzzle()];

let currentSceneIndex = -1;
let currentCharacter = 0;

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
    if (currentSceneIndex >= 0) {
        scenes[currentSceneIndex].update();
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

function transition(n) {
    currentSceneIndex = n;
}
