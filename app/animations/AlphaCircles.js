function AlphaCircles() {
    this.name = 'Alpha Circles';
    this.nbPoints = 125;
    this.maxLayer = 30;
    this.minLayer = 2;
    this.points = [new p5.Vector(0, -1)];
    for (let i = 1; i < this.nbPoints; i++) {
        const v = this.points[i - 1].copy().rotate((2 * PI) / this.nbPoints);
        this.points.push(v);
    }
    this.draw = (percentage) => {
        this.minR = (Math.min(width, height) * 0.05) / 2;
        this.maxR = (Math.min(width, height) * 0.4) / 2;
        this.nbLayers = map(percentage, 0, 100, this.minLayer, this.maxLayer);

        noFill();
        strokeWeight(1);

        push();
        translate(width / 2, height / 2);
        for (let layer = this.nbLayers; layer >= 0; layer--) {
            const baseMag = parseInt(map(layer, 0, 10, this.minR, this.maxR));
            const alpha = map(layer, 0, this.nbLayers, 0.5, 0);
            fill(`rgba(100, 100, 100, ${alpha})`);
            stroke(`rgba(100, 100, 100, ${alpha})`);

            beginShape();
            for (let i = 0; i < this.points.length; i++) {
                const v = this.points[i];
                v.setMag(1);

                const f = 10;
                const offset = 1000;
                const n = noise(offset + v.x / f, offset + v.y / f, frameCount * 0.01);
                const noiseMag = map(n, 0, 1, 0, baseMag * 0.5);

                const totalMag = baseMag + noiseMag;
                const finalMag = totalMag;
                v.setMag(finalMag);
                vertex(v.x, v.y);
            }
            endShape(CLOSE);
        }
        pop();
    };
}
