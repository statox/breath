function Whirlpool() {
    this.minR;
    this.maxR;
    this.nbPoints;
    this.ranges = 4;

    this.draw = (percentage) => {
        this.maxR = (Math.min(width, height) * 0.8) / 2;
        this.minR = 1;
        this.nbPoints = map(percentage, 0, 100, 1, 10);
        this.ranges = map(percentage, 0, 100, 2, 50);

        this.points = [new p5.Vector(0, -1)];
        for (let i = 1; i < this.nbPoints; i++) {
            const v = this.points[i - 1].copy().rotate((2 * PI) / this.nbPoints);
            this.points.push(v);
        }

        background(0);
        strokeWeight(1);
        stroke(200);

        push();
        translate(width / 2, height / 2);
        for (let i = 0; i < this.points.length; i++) {
            const v = this.points[i];
            for (let r = 1; r < this.ranges; r++) {
                const angle = map(r, 1, this.ranges, 0, PI / 2);
                v.setMag(30 * r);
                v.rotate(angle);
                const n = noise(v.x, v.y, frameCount * 0.01);
                const noff = map(n, 0, 1, -20, 20);
                const paint = map(r, 1, this.ranges, 100, 200);
                fill(paint);
                ellipse(v.x, v.y, 10 + noff, 10 + noff);
            }
        }
        pop();
    };
}
