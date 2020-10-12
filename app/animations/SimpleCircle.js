function SimpleCircle() {
    this.name = 'Simple Circle';
    this.minR = 10;
    this.maxR = 200;
    this.draw = (percentage) => {
        this.maxR = Math.min(width, height) * 0.8;
        this.minR = Math.min(width, height) * 0.3;
        const paint = map(percentage, 0, 100, 50, 150);

        background(0);
        fill(paint);

        const r = map(percentage, 0, 100, this.minR, this.maxR);
        circle(width / 2, height / 2, r);
    };
}
