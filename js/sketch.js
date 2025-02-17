const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const scenes = [new Wiring(), new LogicGates()];

let currentSceneIndex = -1;

function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("main");
    background(255);
}

function draw() {
    background(255);
    if (currentSceneIndex >= 0) {
        scenes[currentSceneIndex].update();
        scenes[currentSceneIndex].draw();
        scenes[currentSceneIndex].lateUpdate();
    } else {
        if (mouseIsPressed) {
            stroke(0);
            strokeWeight(4);
            line(mouseX, mouseY, pmouseX, pmouseY);
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
