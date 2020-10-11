let stateComputer;
let fullscreenImage;
let fullscreenButton;
let appSettings = {
    action: '',
    percentage: 0,
    countDown: 0,
    playing: false,
    fullscreen: false
};
let animations;
let animation;

function setup() {
    app = new Vue({
        el: '#appDiv',
        data: appSettings
    });

    // Create the canvas and put it in its div
    const myCanvas = createCanvas(400, 400);
    myCanvas.parent('canvasDiv');

    fullscreenButton = createImg('../assets/fullscreen.png', 'Toggle fullscreen.');
    fullscreenButton.mousePressed(toggleFullscreen);

    customResizeCanvas();

    stateComputer = new StateComputer();

    animations = [new SimpleCircle(), new HalfCirclePolygon(), new PolygonAngle()];
    animationsIndex = 0;
    animation = animations[animationsIndex];
}

function draw() {
    const {action, percentage, countDown, playing} = stateComputer.getUpdate();
    appSettings.action = action;
    appSettings.percentage = percentage;
    appSettings.countDown = countDown;
    appSettings.playing = playing;

    background(100);
    animation.draw(percentage);
}

function start() {
    stateComputer.startSession();
}

function switchAnimation(clockwise) {
    if (clockwise) {
        animationsIndex = (animationsIndex + 1) % animations.length;
        animation = animations[animationsIndex];
    } else {
        animationsIndex = (animationsIndex - 1) % animations.length;
        if (animationsIndex < 0) {
            animationsIndex = animations.length - 1;
        }
        animation = animations[animationsIndex];
    }
}
