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
    resizeCanvas(windowWidth * 0.98, windowHeight * 0.98);

    const minDimension = Math.min(windowHeight, windowWidth);
    const btnDimension = minDimension * 0.02;
    fullscreenButton.size(btnDimension, btnDimension);
    fullscreenButton.position(2 * btnDimension, 2 * btnDimension);
}

function windowResized() {
    customResizeCanvas();
}

function toggleFullscreen() {
    let fs = fullscreen();
    appSettings.fullscreen = !fs;
    fullscreen(!fs);
}
