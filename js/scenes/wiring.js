class Wiring extends Scene {
    late_update() {
        if (keyIsPressed && (keyCode === ESCAPE || keyCode === 66)) {
            transition(-1);
        }
    }

    draw() {
        virtualEdit(() => {
            stroke(0);
            strokeWeight(4);
            // change line color
            fill(255, 0, 243);

            // line(mouseX, mouseY, pmouseX, pmouseY);
            textSize(64);
            text("wiring", mouseX, mouseY, 100, 100);
        });
    }
}
