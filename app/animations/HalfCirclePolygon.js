function HalfCirclePolygon(x, y) {
    this.minL = 20;
    this.maxL = 200;

    this.draw = (percentage) => {
        backgroundColorChange(percentage);

        const x = width / 2;
        const y = height / 2;

        const r = map(percentage, 0, 100, this.minL, this.maxL);
        const nbVertexes = 10;

        const vertexes = [];
        const v = new p5.Vector(-10, 0);
        v.setMag(r);

        for (let i = 0; i <= nbVertexes; i++) {
            vertexes.push(v.copy());
            v.rotate(PI / nbVertexes);
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
}
