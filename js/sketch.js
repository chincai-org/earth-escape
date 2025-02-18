const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const scenes = [new Wiring(), new LogicGates(), new Puzzle()];

let currentSceneIndex = -1;
let currentCharacter = 0;

function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("main");
    background(255);
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
        let dialog = "Nothing can go wrong... right?";
        let currentDialog = dialog.substring(0, currentCharacter);
        dialogBox(currentDialog, "Kikiko", "right");
        currentCharacter += Math.random() / 2;
    }
}

function keyPressed() {
    // 0-9
    if (keyCode >= 48 && keyCode <= 57) {
        transition(keyCode - 48);
    }
}

function mousePressed() {
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
