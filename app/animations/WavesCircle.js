function WavesCircle() {
    this.name = 'Breathing Black Hole';
    this.minR = 10;
    this.maxR = 200;
    this.minOff = 2;
    this.maxOff = 3;
    this.nbPoints = 47;
    this.points = [new p5.Vector(0, 1)];
    this.points[0].setMag(50);
    this.range = 50;

    for (let i = 1; i < this.nbPoints; i++) {
        const v = this.points[i - 1].copy().rotate((2 * PI) / this.nbPoints);
        this.points.push(v);
    }

    this.draw = (percentage) => {
        this.maxR = (Math.min(width, height) * 0.8) / 2;
        this.minR = (Math.min(width, height) * 0.3) / 2;
        background(0);

        strokeWeight(1);
        stroke(255);
        noFill();
        translate(width / 2, height / 2);

        for (let r = 0; r < this.range; r++) {
            let paint;
            if (r < this.range / 2) {
                paint = map(r, 0, this.range, 1, 200);
            } else {
                paint = map(r, 0, this.range, 200, 50);
            }
            stroke(paint);

            beginShape();
            for (let i = 0; i < this.points.length; i++) {
                const v = this.points[i];

                const baseMag = map(percentage, 0, 100, this.minR, this.maxR);

                const n = noise(10000 + v.x * 0.05, 10000 + v.y * 0.05, frameCount * 0.01);
                const noiseMag = map(n, 0, 1, this.minOff * r, this.maxOff * r);

                v.setMag(baseMag + noiseMag);
                vertex(v.x, v.y);
            }
            endShape(CLOSE);
        }
    };
}
