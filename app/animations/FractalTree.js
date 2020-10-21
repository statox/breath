function FractalTree() {
    this.name = 'Fractal Tree';
    this.baseLen = 10;
    this.forkAngleDegrees = 20;
    this.n = 8;
    this.draw = (percentage) => {
        translate(width / 2, height / 2);
        this.forkAngleDegrees = map(percentage, 0, 100, 20, 45);
        this.baseLen = map(percentage, 0, 100, 0.5, 10);

        for (let i = 0; i < 4; i++) {
            push();
            translate(0, this.baseLen * this.n);
            rotate((i * PI) / 2);
            this._drawStep(0, 0, this.n);
            pop();
        }
    };

    this._drawStep = (x, y, depth) => {
        if (depth === 0) {
            return;
        }

        const forkAngle = radians(this.forkAngleDegrees);
        const paint = map(depth, this.n, 0, 150, 50);
        stroke(paint);
        push();
        const newLen = this.baseLen * depth;
        translate(x, y - newLen);
        line(0, newLen, 0, 0);
        // circle(0, 0, newLen);

        rotate(forkAngle);
        this._drawStep(0, 0, depth - 1);

        rotate(2 * -forkAngle);
        this._drawStep(0, 0, depth - 1);
        pop();
    };

    /*
     * this._drawStepSimpleTree = (x, y, depth) => {
     *     const forkAngle = radians(this.forkAngleDegrees);
     *     if (depth > 0) {
     *         push();
     *         translate(x, y - this.baseLen * depth);
     *         line(0, this.baseLen * depth, 0, 0);
     *         rotate(forkAngle);
     *         this._drawStep(0, 0, depth - 1);
     *         rotate(2 * -forkAngle);
     *         this._drawStep(0, 0, depth - 1);
     *         pop();
     *     }
     * };
     */
}
