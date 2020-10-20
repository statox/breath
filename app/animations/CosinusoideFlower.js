function CosinusoideFlower() {
    this.name = 'Sinusoidal Flower';
    this.minX;
    this.maxX;
    this.nbX;
    this.nbPoints = 7;
    this.normalVector = createVector(0, -1);

    this.points = [new p5.Vector(0, -1)];
    for (let i = 1; i < this.nbPoints; i++) {
        const v = this.points[i - 1].copy().rotate((2 * PI) / this.nbPoints);
        this.points.push(v);
    }
    this.draw = (percentage) => {
        this.maxX = (Math.min(width, height) * 0.8) / 2;

        this.minScreenX = (Math.min(width, height) * 0.01) / 2;
        this.maxScreenX = map(percentage, 0, 100, this.minScreenX, this.maxX);

        this.nbX = 100;

        background(0);
        stroke(200);
        push();
        translate(width / 2, height / 2);
        const n = noise(frameCount * 0.01);
        const yNoise = map(n, 0, 1, -25, 25);
        for (let i = 0; i < this.points.length; i++) {
            const v = this.points[i];
            rotate((2 * PI) / this.nbPoints);

            beginShape();
            for (let x = 0; x < this.nbX; x++) {
                const screenX = map(x, 0, this.nbX, this.minScreenX, this.maxScreenX);

                const frequency = map(percentage, 0, 100, 0.01, 0.03);
                const amplitude = map(x, 0, this.nbX, 0.5, 10);
                const normX = map(x, 0, this.nbX, 0, 1);
                const cosX = Math.cos(frequency * x) * amplitude;
                const screenY = map(cosX, 0, 1, -10, 10) + yNoise;

                const paint = map(x, 0, this.nbX, 200, 100);
                stroke(paint);
                vertex(screenX, screenY);
            }
            endShape();

            beginShape();
            for (let x = 0; x < this.nbX; x++) {
                const screenX = map(x, 0, this.nbX, this.minScreenX, this.maxScreenX);

                const frequency = map(percentage, 0, 100, 0.01, 0.03);
                const amplitude = map(x, 0, this.nbX, 0.5, 10);
                const normX = map(x, 0, this.nbX, 0, 1);
                const cosX = -Math.cos(frequency * x) * amplitude;
                const screenY = map(cosX, 0, 1, -10, 10) + yNoise;

                const paint = map(x, 0, this.nbX, 200, 100);
                stroke(paint);
                vertex(screenX, screenY);
            }
            endShape();
        }
        pop();
    };
}
