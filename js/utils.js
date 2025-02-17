/**
 * @param {CallableFunction} callable
 */
function virtualEdit(callable) {
    push();
    callable();
    pop();
}

function dialogBox(txt, name, align) {
    fill(252, 187, 3);
    noStroke();
    const BoxY = canvasHeight * .75;
    const BoxHeight = canvasHeight * .23;
    rect(canvasWidth * .1, BoxY, canvasWidth * .8, BoxHeight, 10, 10, 10, 10);
    noStroke();
    const padding = canvasWidth * .008;
    fill(252, 103, 3);
    rect(canvasWidth * .108, padding + BoxY, canvasWidth * .784, BoxHeight - canvasWidth * .016, 10, 10, 10, 10);
    fill(0);
    textFont('Comic Sans', 20);
    textStyle(NORMAL);
    text(txt, canvasWidth * .116, canvasWidth * .016 + BoxY, canvasWidth * .768, BoxHeight - canvasWidth * .032);

    if (align == "left") {
        fill(252, 187, 3);
        rect(canvasWidth * .2, canvasHeight * .68, canvasWidth * .2, canvasHeight * .0703, 10, 10, 0, 0);
        fill(252, 103, 3);
        rect(canvasWidth * .208, canvasHeight * .68 + padding, canvasWidth * .184, canvasHeight * .07 - padding, 10, 10, 0, 0);
        fill(0);
        textStyle(BOLD);
        text(name, canvasWidth * .216, canvasHeight * .68 + 2 * padding, canvasWidth * .784, BoxHeight - canvasWidth * .016);
    } else {
        fill(252, 187, 3);
        rect(canvasWidth * .6, canvasHeight * .68, canvasWidth * .2, canvasHeight * .0703, 10, 10, 0, 0);
        fill(252, 103, 3);
        rect(canvasWidth * .608, canvasHeight * .68 + padding, canvasWidth * .184, canvasHeight * .07 - padding, 10, 10, 0, 0);
        fill(0);
        textStyle(BOLD);
        text(name, canvasWidth * .616, canvasHeight * .68 + 2 * padding, canvasWidth * .784, BoxHeight - canvasWidth * .016);
    }
}
