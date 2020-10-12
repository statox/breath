function CirclesCircles() {
    this.minR;
    this.maxR;
    this.nbDots = 5;
    this.nbPoints;

    this.draw = (percentage) => {
        this.maxR = (Math.min(width, height) * 0.8) / 2;
        this.minR = 1;
        this.nbPoints = parseInt(map(percentage, 0, 100, 5, 150));

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
            const baseMag = map(percentage, 0, 100, this.minR, this.maxR);

            for (let j = 1; j < this.nbDots + 1; j++) {
                const lerpedMag = map(j, 0, this.nbDots, this.minR, baseMag);
                const size = map(j, 0, this.nbDots, this.maxR * 0.1, this.maxR * 0.5);
                const paint = map(j, 0, this.nbDots, 50, 150);
                v.setMag(lerpedMag);
                stroke(paint);
                ellipse(v.x, v.y, size, size);
            }
        }
        pop();
    };
}
