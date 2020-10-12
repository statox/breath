function Droplet() {
    this.name = 'Droplet';
    this.minR;
    this.maxR;
    this.minNoise;
    this.maxNoise;

    this.nbPoints = 360;
    this.points = [new p5.Vector(0, 1)];
    for (let i = 1; i < this.nbPoints; i++) {
        const v = this.points[i - 1].copy().rotate((2 * PI) / this.nbPoints);
        this.points.push(v);
    }

    this.draw = (percentage) => {
        this.minR = Math.min(width, height) * 0.1;
        this.maxR = Math.min(width, height) * 0.3;

        background(0);
        strokeWeight(1);
        noStroke();
        fill('rgba(100, 230, 245, 0.8)');
        push();
        translate(width / 2, height / 2);

        beginShape();
        for (let i = 0; i < this.points.length; i++) {
            const v = this.points[i];

            const baseMag = map(percentage, 0, 100, this.minR, this.maxR);

            this.minNoise = -baseMag * 0.05;
            this.maxNoise = baseMag * 0.05;

            const n = noise(1000 + v.x * 0.01, 1000 + v.y * 0.01, frameCount * 0.05);
            const noiseMag = map(n, 0, 1, this.minNoise, this.maxNoise);
            v.setMag(baseMag + noiseMag);
            vertex(v.x, v.y);
        }
        endShape(CLOSE);

        pop();
    };
}
