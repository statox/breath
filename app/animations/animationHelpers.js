function backgroundColorChange(percentage) {
    const r = 125;
    const g = map(percentage, 0, 100, 50, 200);
    const b = 200;
    background(r, g, b);
}
