const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("main");
    background(255);
}

function draw() {
    if (mouseIsPressed) {
        stroke(0);
        strokeWeight(4);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}
