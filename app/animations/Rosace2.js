function Rosace2() {
    this.name = 'Rosace II';
    this.nbDir = 100;
    this.maxAngle = 8 * PI;
    this.nbPoints = 10;
    this.directions = [new p5.Vector(0, -1)];

    for (let i = 1; i < this.nbDir; i++) {
        const v = this.directions[i - 1].copy().rotate(this.maxAngle / this.nbDir);
        this.directions.push(v);
    }

    this.draw = (percentage) => {
        const baseMag = (Math.min(width, height) * 0.8) / 2;
        translate(width / 2, height / 2);

        const shownNbDir = map(percentage, 0, 100, 1, this.nbDir);
        for (let i = 0; i < shownNbDir; i++) {
            const v = this.directions[i].copy();
            const mag = map(i, 0, this.nbDir, 0, baseMag);
            const size = map(i, 0, this.nbDir, baseMag / 10, baseMag / 2);
            const paint = map(Math.abs(shownNbDir / 2 - i), 0, shownNbDir / 2, 50, 200);
            v.setMag(mag);
            for (let j = 0; j < 8; j++) {
                v.rotate(PI / 4);
                stroke(paint);
                circle(v.x, v.y, size);
            }
        }
    };
}
