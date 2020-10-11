function SimpleCircle() {
    this.minR = 10;
    this.maxR = 200;
    this.draw = (percentage) => {
        // backgroundColorChange(percentage);
        background(50);
        backgroundWaves(percentage);

        const r = map(percentage, 0, 100, this.minR, this.maxR);
        circle(width / 2, height / 2, r);
    };
}
