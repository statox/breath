function TriangleWheel() {
    this.minR;
    this.maxR;
    this.nbPoints;
    this.points;
    this.angle;
    this.ranges = 10;

    this.draw = (percentage) => {
        this.maxR = (Math.min(width, height) * 0.8) / 2;
        this.minR = (Math.min(width, height) * 0.3) / 2;

        this.nbPoints = map(percentage, 0, 100, 3, 9);
        this.points = [new p5.Vector(0, -1)];

        this.angle = map(percentage, 0, 100, 0, PI / this.nbPoints);

        for (let i = 1; i < this.nbPoints; i++) {
            const v = this.points[i - 1].copy().rotate((2 * PI) / this.nbPoints);
            this.points.push(v);
        }

        background(0);
        push();
        translate(width / 2, height / 2);
        stroke(200);
        for (let range = 0; range < this.ranges; range++) {
            beginShape();
            for (let i = 0; i < this.points.length; i++) {
                const v = this.points[i];
                const baseMag = map(percentage, 0, 100, this.minR, this.maxR);

                v.rotate(this.angle);
                v.setMag(baseMag);
                vertex(v.x, v.y);
            }
            endShape(CLOSE);
        }
        pop();
    };
}
