function backgroundColorChange(percentage) {
    const r = 125;
    const g = map(percentage, 0, 100, 50, 200);
    const b = 200;
    background(r, g, b);
}

/*
 * Shamelessly stolen from Clarke Cribb on here:
 * https://stackoverflow.com/q/63703142/4194289
 */
function backgroundWaves(percentage) {
    noFill();
    strokeWeight(1);
    const ranges = 100;

    for (let i = 1; i < ranges; i++) {
        let paint = map(i, 0, ranges, 1, 105);
        stroke(paint);

        beginShape();
        for (let x = -100; x < width + 11; x += 20) {
            const n = noise(x * 0.001, i * 0.01, frameCount * 0.01);
            const noff = map(percentage, 100, 0, 50, height);
            const y = map(n, 0.1, 1, noff, height);
            vertex(x, y);
        }
        endShape();
    }
}
