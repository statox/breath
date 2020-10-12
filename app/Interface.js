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

// https://stackoverflow.com/a/25246044/4194289
function toggleFullscreen() {
    const elem = document.body;
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (
        (document.fullScreenElement !== undefined && document.fullScreenElement === null) ||
        (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) ||
        (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
        (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)
    ) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function updateSessionDuration() {
    stateComputer.updateSessionDuration();
}
