/*
 * Heart curve using the 5th curve in this page
 * https://mathworld.wolfram.com/HeartCurve.html
 *
 * Attributed to an unknown contributor of Wolfram Alpha
 */
function Pulse() {
    this.name = 'Pulse';
    this.minM;
    this.maxM;
    this.ranges = 11;
    this.points = [];

    for (let a = 0; a < TWO_PI * 2; a += 0.01) {
        const r = 2 - 2 * sin(a) + sin(a) * (Math.sqrt(Math.abs(cos(a))) / (sin(a) + 1.4));
        this.points.push({r, a});
    }

    this.draw = (percentage) => {
        this.minM = (Math.min(width, height) * 0.1) / 2;
        this.maxM = (Math.min(width, height) * 1.3) / 2;
        this.ranges = map(percentage, 0, 100, 1, 8);
        let baseMag = map(percentage, 0, 100, this.minM, this.maxM);

        translate(width / 2, height / 2 - baseMag * 1.3);
        rotate(PI);
        for (let range = 0; range < this.ranges; range++) {
            const paint = map(range, 0, this.ranges, 200, 50);
            stroke(paint);
            translate(0, -50);
            beginShape();
            for ({r, a} of this.points) {
                const R = r * baseMag;
                const x = cos(a) * R;
                const y = sin(a) * R;
                vertex(x, y);
            }
            endShape(CLOSE);
            baseMag *= 0.8;
        }
    };
}
