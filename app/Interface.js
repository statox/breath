function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        switchAnimation(false);
    }

    if (keyCode === RIGHT_ARROW) {
        switchAnimation(true);
    }

    // SPACE
    if (keyCode === 32) {
        start();
    }
}

function customResizeCanvas() {
    resizeCanvas(windowWidth, windowHeight);
}
function windowResized() {
    customResizeCanvas();
}
