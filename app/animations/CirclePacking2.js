function CirclePacking2() {
    this.name = 'WIP - Circle Packing 2';
    this.circles = [];
    this.maxAttemptsCircleCreation = 10;
    this.newCirclesByGeneration = 100;

    this.draw = (percentage, {action}) => {
        this.maxR = (Math.min(width, height) / 2) * 1.5;
        this.minR = 10;

        this.r = map(percentage, 0, 100, this.minR, this.maxR);

        this.minNewR = this.r * 0.2;
        this.maxNewR = this.r * 0.9;

        const angle = map(noise(percentage * 0.001, millis() * 0.0001), 0, 1, -PI, PI);

        push();
        translate(width / 2, height / 2);
        rotate(angle);

        stroke('rgba(200, 200, 200, 0.01)');
        circle(0, 0, this.r * 2);

        if (action === 'inhale') {
            this.newCircles();
            this.growCircles();
        } else if (action === 'exhale') {
            this.removeBorderCircles();
        } else if (action === 'exhale pause') {
            this.circles = [];
        }
        this.circles.forEach((c) => c.draw(this.r));
        pop();
    };

    this.shrinkCircles = () => {
        this.circles.forEach((c) => {
            if (c.r > 10) {
                c.shrink();
            }
        });
    };

    this.removeBorderCircles = () => {
        let i = this.circles.length - 1;
        while (i > 0) {
            const c = this.circles[i];
            if (c.reachedEdges(this.r)) {
                this.circles.splice(i, 1);
            }
            i--;
        }
    };

    this.growCircles = () => {
        this.circles.forEach((c) => {
            if (c.growing) {
                c.grow();
                if (c.reachedEdges(this.r) || c.hasIntersection(this.circles)) {
                    c.growing = false;
                }
            }
        });
    };

    this.newCircle = () => {
        let attempts = this.maxAttemptsCircleCreation;
        let newC;

        while (attempts > 0 && !newC) {
            const r = random(this.r / 4);
            const pos = p5.Vector.random2D();
            const mag = map(random(), 0, 1, this.minNewR, this.maxNewR);
            // pos.setMag(random(this.r - 2 * r));
            pos.setMag(mag);

            newC = new Circle(pos, r);
            if (!newC.hasIntersection(this.circles) && !newC.reachedEdges(this.r)) {
                this.circles.push(newC);
            }
            attempts--;
        }

        return;
    };

    this.newCircles = () => {
        let i = this.newCirclesByGeneration;
        while (i > 0) {
            this.newCircle();
            i--;
        }
    };

    function Circle(pos, r, c) {
        this.pos = pos;
        this.r = r;
        this.c = [125, 200, 230];
        this.growing = true;

        this.draw = (R) => {
            // const alpha = map(this.pos.mag(), 0, R, 1, 0);
            const alpha = map(this.pos.mag(), 0, R, 0.1, 0.9);
            const col = `rgba(${this.c[0]} , ${this.c[1]}, ${this.c[2]}, ${alpha})`;
            stroke(col);
            noFill();
            push();
            translate(this.pos.x, this.pos.y);
            circle(0, 0, this.r * 2);
            pop();
        };

        this.reachedEdges = (R) => this.pos.mag() + this.r >= R;
        this.grow = () => this.r++;
        this.shrink = () => {
            this.pos.setMag(this.pos.mag() * 0.995);
            this.r *= 0.995;
        };

        this.hasIntersection = (circles) => {
            const intersections = circles.findIndex(
                (other) =>
                    this.pos !== other.pos && dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) < other.r + this.r
            );
            return intersections !== -1;
        };
    }
}
