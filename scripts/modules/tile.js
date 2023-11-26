export default class Tile {
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

    // TODO: reconfig tile.js export to not need these to be hardcoded in two different places (stinky)
    let side = 57;
    let shortDiag = 98;
    let longDiag = side * 2;

    let retVal = `<g transform="
    rotate(${this.rotation} ${this.x + shortDiag / 2} ${
      this.y + longDiag / 2
    }), translate(${this.x} ${this.y})">${this.base}</g>`;
    return retVal;
  }
}
