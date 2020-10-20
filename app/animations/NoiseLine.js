function NoiseLine() {
    this.name = 'WIP - Noisy Line';
    this.nbX;
    this.ranges = 1;
    this.noiseSectionWidth;
    this.draw = (percentage) => {
        this.minH = (height / 2) * 0.2;
        this.maxH = height / 2;
        this.nbX = 100;
        // this.noiseSectionWidth = this.nbX / 10;
        const baseMag = map(percentage, 0, 100, this.minH, this.maxH);

        translate(0, height / 2);

        const persistence = 0.4;
        const octaves = 50;
        const paint = map(octaves, 0, 10, 100, 200);

        stroke(paint);

        // const noiseSectionX = map(percentage, 0, 100, 0, this.nbX - this.noiseSectionWidth);
        // this.noiseSectionWidth = this.nbX / 10;
        this.noiseSectionWidth = this.nbX / map(percentage, 0, 100, 10, 1);
        const noiseSectionX = this.nbX / 2;
        for (let line = 1; line < 10; line++) {
            const rangeMag = map(line, 1, 10, this.minH, this.maxH);
            const phase = line * 0.1;
            beginShape();
            for (let x = 0; x < this.nbX; x++) {
                const screenX = map(x, 0, this.nbX - 1, 0, width);
                let screenY = 0;

                const n = Noise({x: phase + x * 0.001, octaves, lacunarity: 20, persistence});
                const noiseMag = map(x * 0.001, 0, this.nbX / 2, rangeMag, 0);

                if (x > noiseSectionX - this.noiseSectionWidth / 2 && x < noiseSectionX + this.noiseSectionWidth / 2) {
                    screenY += map(n, 0, 1, noiseMag, -noiseMag);
                }
                vertex(screenX, screenY);
            }
            endShape();
        }
        debugger; // AFA
    };
}
