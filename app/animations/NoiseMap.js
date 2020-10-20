function NoiseMap() {
    this.name = 'WIP - Noise map';
    this.scale = 30;

    this.draw = (percentage) => {
        noStroke();
        const persistence = 0.5;
        const lacunarity = 10;
        const octaves = 5;

        for (let y = 0; y < height; y += this.scale) {
            for (let x = 0; x < width; x += this.scale) {
                const offset = map(percentage, 0, 100, 0, width);
                const n = Noise({x: (x + offset) * 0.01, y: y * 0.01, octaves, lacunarity, persistence});
                if (n > 1 || n < 0) {
                    console.log(n);
                }
                // const paint = map(n, 0, 1, 50, 200);
                let paint;
                if (n < 0.3) {
                    paint = 'blue';
                } else if (n < 0.6) {
                    paint = 'green';
                } else if (n < 1) {
                    paint = 'brown';
                }
                stroke(paint);
                fill(paint);
                square(x, y, this.scale);
            }
        }
    };
}
