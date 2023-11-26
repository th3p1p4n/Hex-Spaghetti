import Tile from "./modules/tile.js";
("use strict");

// num of tiles across and up/down
let width;
let height;
// hex size (https://www.omnicalculator.com/math/hexagon)
let side = 57;
let shortDiag = 98;
let longDiag = side * 2;
// params for a singular tile; adjust as-needed.
let color;
let baseTile = JSON.parse(JSON.stringify("./modules/baseTile.json"));

//TODO: fix test tile thing, and/or remove it as an option
//NOTE: would be good to keep as an option, as it can show how the rotations work
// let testTile = {
//   template: `<path stroke="#0F0" fill="#112d5a" d="M49.363448015713 0L98.726896031426 28.5L98.726896031426 85.5L49.363448015713 114L0 85.5L0 28.5Z"></path> <path stroke-width="10" stroke="#F00" d="M49.363448015713 0L98.726896031426 28.5"></path>`,
// };

//other things shhhhhh
let grid;
let outString = "";
let useNoise;

const addToString = (newTxt) => {
  outString = outString + newTxt + "\n";
};

const loadParams = () => {
  width = document.querySelector("#width").value;
  height = document.querySelector("#height").value;
  color = document.querySelector("#color").value;
  useNoise = document.querySelector("#use-noise").checked;
  // if (document.querySelector("#test").checked) {
  //   baseTile.template = testTile.template;
  // } else {//TODO: fix test tile thing, or remove it as an option
};

const generate = () => {
  // setup
  loadParams();
  let tiles = [];

  // beginning tags
  outString = `<svg version="1.1" width="${width * shortDiag}px" height="${
    height * longDiag
  }px" xmlns="http://www.w3.org/2000/svg">`; //<rect width="100%" height="100%" fill="white"/>

  // image generation
  //TODO: replace complex if/elses with objs containing noiseVar:rotation. Put objs into their own .json?
  // --> math would make more sense.
  for (let i = 0; i <= height + 1; i++) {
    for (let j = -1; j <= width; j++) {
      let rotation = 0;
      let rand = Math.random() * (1 - -1) + -1;
      if (rand > 0.6) {
        rotation = 300;
      } else if (rand > 0.3) {
        rotation = 240;
      } else if (rand > 0.0) {
        rotation = 180;
      } else if (rand > -0.3) {
        rotation = 120;
      } else if (rand > -0.6) {
        rotation = 60;
      } else {
        rotation = 0;
      }
      let offset = () => {
        if (i % 2 == 1) {
          return side * 0.86;
        }
        return 0;
      };
      tiles.push(
        new Tile(
          j * shortDiag + offset(),
          i * (shortDiag - 0.2 * side) - side, // shifts up by 1/2 tile to avoid untiled upper border
          rotation,
          baseTile.template //????????? TODO: reconfig template thing that I'd started earlier.
          // TODO: finish implementing loading of baseTile from JSON; get it to work before making changes.
          // currently spits out a svg full of "undefined" lol
        ) //x (incl. offset),y,rotation,base
      );
    }
  }

  // image drawing
  for (let i = 0; i < tiles.length; i++) {
    addToString(tiles[i].draw());
  }

  // closing tag
  addToString("</svg>");

  // display on page AND as plaintext to copy into a file
  let place = document.querySelector("#place");
  place.innerHTML = outString;
  let cleanedOutString = outString.replace(/</g, "&lt");
  document.querySelector("#svg-data").innerHTML = cleanedOutString;
};

window.onload = () => {
  document.querySelector("#generate").onclick = generate;
  generate();
};
