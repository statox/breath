/*
 * Largely inspired by ParvaP's parabolic curves
 * https://github.com/ParvaP/Generative
 */

function ParabolicCurves() {
    this.name = 'Parabolic curves';
    this.minN = 40;
    this.maxN = 5;
    this.minPaint = 50;
    this.maxPaint = 60;

    this.draw = (percentage) => {
        const maxDim = Math.min(width, height) * 0.9;
        const n = map(percentage, 0, 100, this.maxN, this.minN);
        // const dim = map(percentage, 0, 100, maxDim * 0.3, maxDim);
        const dim = maxDim;

        const quadWidth = dim / 2;
        const quadHeight = dim / 2;

        translate(width / 2 - quadWidth, height / 2 - quadHeight);

        stroke(this.minPaint);
        line(0, quadHeight, dim, quadHeight); //middle horizontal lines
        line(quadWidth, 0, quadWidth, dim); //middle vertical line

        for (let i = 0; i < n; i++) {
            const paint = map(i, 0, this.maxN, this.minPaint, this.maxPaint);
            stroke(paint);

            //top left quadrant
            line(quadWidth, (i * quadHeight) / n, ((n - i - 1) * quadWidth) / n, quadHeight);
            //top right quadrant
            line(quadWidth, (i * quadHeight) / n, ((i + 1) * quadWidth) / n + quadWidth, quadHeight);
            //botton right quadrant
            line(quadWidth, dim - (i * quadHeight) / n, ((i + 1) * quadWidth) / n + quadWidth, quadHeight);
            //bottom left quadrant
            line(quadWidth, dim - (i * quadHeight) / n, ((n - i - 1) * quadWidth) / n, quadHeight);
        }
    };
}
