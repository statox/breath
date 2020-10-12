/*
 * Code to detect mobile swipe taken from Givanse here:
 * https://stackoverflow.com/a/23230280/4194289
 */

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            /* left swipe */
            switchAnimation(false);
        } else {
            /* right swipe */
            switchAnimation(true);
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
}
