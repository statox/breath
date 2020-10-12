function PolygonAngle(x, y, maxAngle) {
    this.minL = 20;
    this.maxL = 200;
    this.maxAngle = 2 * PI;

    this.draw = (percentage) => {
        backgroundColorChange(percentage);
        fill('rgba(100, 150, 100, 0.4)');

        const x = width / 2;
        const y = height / 2;

        const nbVertexes = 10;
        const angle = map(percentage, 0, 100, 0, this.maxAngle / nbVertexes);

        const vertexes = [];
        const v = new p5.Vector(0, -10);
        v.setMag(100);

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
