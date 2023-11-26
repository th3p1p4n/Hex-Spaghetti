export default class tile {
  x;
  y;
  rotation;
  base;
  constructor(x, y, rotation, base) {
    this.base = base;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }
  draw() {
    console.log(
      `Drew a tile: x=${this.x} y=${this.y} rotation=${this.rotation}`
    );
    addToString(
      `<g transform="
        rotate(${this.rotation} ${this.x + shortDiag / 2} ${
        this.y + longDiag / 2
      }), 
        translate(${this.x} ${this.y})">
        ${this.base}</g>`
    );
  }
}
