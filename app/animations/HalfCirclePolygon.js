function HalfCirclePolygon(x, y) {
    this.minL = 20;
    this.maxL = 200;

    this.draw = (percentage) => {
        this.minL = Math.min(width, height) * 0.3;
        this.maxL = Math.min(width, height) * 0.8;

        background(0);
        stroke(150);
        fill(125);
        const x = width / 2;
        const y = height * 0.05;

        const r = map(percentage, 0, 100, this.minL, this.maxL);
        const nbVertexes = 13;

        const vertexes = [];
        const v = new p5.Vector(-10, 0);
        v.setMag(r);

        for (let i = 0; i <= nbVertexes; i++) {
            vertexes.push(v.copy());
            v.rotate(-PI / nbVertexes);
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
        noFill();
    };
}
