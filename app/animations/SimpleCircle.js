function SimpleCircle() {
    this.minR = 10;
    this.maxR = 200;
    this.draw = (percentage) => {
        this.maxR = (Math.min(width, height) * 0.8) / 2;
        this.minR = (Math.min(width, height) * 0.3) / 2;

        background(0);
        strokeWeight(1);
        stroke(200);

        const r = map(percentage, 0, 100, this.minR, this.maxR);
        circle(width / 2, height / 2, r);
    };
}
