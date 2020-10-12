function Waves() {
    this.name = 'Inspired';
    this.ranges = 100;
    /*
     * Largely inspired from Clarke Cribb on here:
     * https://stackoverflow.com/q/63703142/4194289
     */
    this.draw = (percentage) => {
        noFill();
        background(0);
        strokeWeight(1);

        for (let i = 1; i < this.ranges; i++) {
            let paint = map(i, 0, this.ranges, 1, 105);
            stroke(paint);

            beginShape();
            for (let x = -100; x < width + 11; x += 20) {
                const n = noise(x * 0.001, i * 0.01, frameCount * 0.01);
                const noff = map(percentage, 100, 0, 0, height);
                const y = map(n, 0, 1, noff, height);
                vertex(x, y);
            }
            endShape();
        }
    };
}
