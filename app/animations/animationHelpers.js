function drawCountDown(playing, countDown) {
    const duration = stateComputer.sessionDuration / 1000;
    const minDim = Math.min(width, height);
    const {inStartPeriod, inEndPeriod} = stateComputer;

    if (playing && !inStartPeriod && !inEndPeriod) {
        return;
    }

    let paint;
    let textTimer = '';
    if (!playing) {
        paint = 150;
        textTimer = getTimeAsString(stateComputer.sessionDuration / 1000);
    }
    if (inStartPeriod) {
        paint = map(
            millis(),
            stateComputer.sessionStartTime,
            stateComputer.sessionStartTime + stateComputer.countDownShowingPeriod,
            150,
            0
        );
        textTimer = getTimeAsString(countDown);
    }
    if (inEndPeriod) {
        paint = map(millis(), stateComputer.endPeriodStartTime, stateComputer.endPeriodEndTime, 0, 150);
        textTimer = getTimeAsString((stateComputer.endPeriodEndTime - millis()) / 1000);
    }

    push();
    translate((width / 2) * 0.95, height * 0.05);
    textSize(minDim * 0.05);
    stroke(paint);
    fill(paint);
    text(textTimer, 0, 0);
    pop();
}

function getTimeAsString(total) {
    let minutes = parseInt(total / 60);
    let seconds = parseInt(total % 60);
    let result = '';

    if (minutes < 10) {
        result += '0';
    }
    result += `${minutes} : `;
    if (seconds < 10) {
        result += '0';
    }
    result += `${seconds}`;
    return result;
}
