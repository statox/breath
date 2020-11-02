function CirclePacking1() {
    this.name = 'WIP - Circle Packing';
    this.circles = [];

    this.circles.push(new Circle(0, 0, this.maxR / 4));

    this.draw = (percentage) => {
        this.maxR = Math.min(width, height) / 2;
        this.minR = (Math.min(width, height) * 0.1) / 2;
        this.r = map(percentage, 0, 100, this.minR, this.maxR);
        this.r = this.maxR;

        push();
        translate(width / 2, height / 2);

        stroke(200);
        // circle(0, 0, this.r * 2);

        this.newCircle();
        this.circles.forEach((c) => {
            if (c.growing) {
                c.grow();
                if (c.reachedEdges(this.r) || c.hasIntersection(this.circles)) {
                    c.growing = false;
                }
            }
        });
        this.circles.forEach((c) => c.draw());
        pop();
    };

    this.newCircle = () => {
        let x = map(random(), 0, 1, -this.r, this.r);
        let y = map(random(), 0, 1, -this.r, this.r);
        let r = random(10);

        const newC = new Circle(x, y, r);
        if (!newC.hasIntersection(this.circles) && !newC.reachedEdges(this.r)) {
            this.circles.push(newC);
        }

        return;
    };

    this.newCircles = () => {
        let totalNewCircles = 10;
        let remainingAttemps = 10;
        let countNewCircles = 0;

        while (countNewCircles < totalNewCircles && remainingAttemps > 0) {
            remainingAttemps--;

            const newC = this.newCircle();
            if (newC !== undefined) {
                this.circles.push(newC);
                countNewCircles++;
            }
        }
    };

    function Circle(x, y, r, c) {
        this.pos = new p5.Vector(x, y);
        this.r = r;
        this.c = c || 250;
        this.growing = true;

        this.draw = () => {
            stroke(this.c);
            noFill();
            push();
            translate(this.pos.x, this.pos.y);
            circle(0, 0, this.r * 2);
            pop();
        };

        this.reachedEdges = (R) => this.pos.mag() + this.r >= R;
        this.grow = () => this.r++;

        this.hasIntersection = (circles) =>
            circles.findIndex((other) => dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) < other.r + this.r) ===
            -1;
    }
}
