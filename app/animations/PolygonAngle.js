function PolygonAngle(x, y, maxAngle) {
    this.minL = 20;
    this.maxL = 200;
    this.maxAngle = 2 * PI;

    this.draw = (percentage) => {
        this.mag = (Math.min(width, height) * 0.8) / 2;
        background(0);
        stroke(150);
        fill(125);

        const x = width / 2;
        const y = height / 2;

        const nbVertexes = 10;
        const angle = map(percentage, 0, 100, 0, this.maxAngle / nbVertexes);

        const vertexes = [];
        const v = new p5.Vector(0, -10);
        v.setMag(this.mag);

        for (let i = 0; i <= nbVertexes; i++) {
            vertexes.push(v.copy());
            v.rotate(angle);
        }
        vertexes.push(new p5.Vector(0, 0));
        vertexes.push(vertexes[0].copy());

        push();
        translate(x, y);
        beginShape();
        for (const v of vertexes) {
            vertex(v.x, v.y);
        }
        endShape();
        pop();
    };
    noFill();
}
