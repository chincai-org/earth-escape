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

    const BoxY = canvasHeight * 0.75;
    const BoxHeight = canvasHeight * 0.23;

    rect(canvasWidth * 0.1, BoxY, canvasWidth * 0.8, BoxHeight, 10, 10, 10, 10);
    noStroke();

    const padding = canvasWidth * 0.008;

    fill(252, 103, 3);
    rect(
        canvasWidth * 0.108,
        padding + BoxY,
        canvasWidth * 0.784,
        BoxHeight - canvasWidth * 0.016,
        10,
        10,
        10,
        10
    );
    fill(0);
    textFont("Comic Sans", 20);
    textStyle(NORMAL);
    text(
        txt,
        canvasWidth * 0.116,
        canvasWidth * 0.016 + BoxY,
        canvasWidth * 0.768,
        BoxHeight - canvasWidth * 0.032
    );

    if (align == "left") {
        fill(252, 187, 3);
        rect(
            canvasWidth * 0.2,
            canvasHeight * 0.68,
            canvasWidth * 0.2,
            canvasHeight * 0.0703,
            10,
            10,
            0,
            0
        );
        fill(252, 103, 3);
        rect(
            canvasWidth * 0.208,
            canvasHeight * 0.68 + padding,
            canvasWidth * 0.184,
            canvasHeight * 0.07 - padding,
            10,
            10,
            0,
            0
        );
        fill(0);
        textStyle(BOLD);
        text(
            name,
            canvasWidth * 0.216,
            canvasHeight * 0.68 + 2 * padding,
            canvasWidth * 0.784,
            BoxHeight - canvasWidth * 0.016
        );
    } else {
        fill(252, 187, 3);
        rect(
            canvasWidth * 0.6,
            canvasHeight * 0.68,
            canvasWidth * 0.2,
            canvasHeight * 0.0703,
            10,
            10,
            0,
            0
        );
        fill(252, 103, 3);
        rect(
            canvasWidth * 0.608,
            canvasHeight * 0.68 + padding,
            canvasWidth * 0.184,
            canvasHeight * 0.07 - padding,
            10,
            10,
            0,
            0
        );
        fill(0);
        textStyle(BOLD);
        text(
            name,
            canvasWidth * 0.616,
            canvasHeight * 0.68 + 2 * padding,
            canvasWidth * 0.784,
            BoxHeight - canvasWidth * 0.016
        );
    }
}
