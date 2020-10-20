let stateComputer;
let fullscreenImage;
let appSettings = {
    action: '',
    percentage: 0,
    countDown: 0,
    playing: false,
    time: 3
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

    customResizeCanvas();

    stateComputer = new StateComputer();

    animations = [
        new SinusoideFlower(),
        new Sinusoide1(),
        new CirclesCircles(),
        new WavesCircle(),
        new Waves(),
        new Whirlpool(),
        new TriangleWheel(),
        new Pulse(),
        new Droplet(),
        new AlphaCircles(),
        // new NoiseLine(),
        // new NoiseMap(),
        new SimpleCircleAlpha(),
        // new SimpleCircle(),
        new HalfCirclePolygon(),
        new PolygonAngle()
    ];
    animationsIndex = 0;
    animation = animations[animationsIndex];

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
}

function draw() {
    const {action, percentage, countDown, playing} = stateComputer.getUpdate();
    appSettings.action = action;
    appSettings.percentage = percentage;
    appSettings.countDown = countDown;
    appSettings.playing = playing;

    background(0);
    push();
    animation.draw(percentage);
    pop();
    drawCountDown(playing, countDown);
    drawAnimationName(animation.name);
}

function start() {
    stateComputer.startSession();
}

function switchAnimation(clockwise) {
    if (clockwise) {
        animationsIndex = (animationsIndex + 1) % animations.length;
    } else {
        animationsIndex = (animationsIndex - 1) % animations.length;
        if (animationsIndex < 0) {
            animationsIndex = animations.length - 1;
        }
    }
    animation = animations[animationsIndex];
}
