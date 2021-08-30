const fs = require("fs");
const myArgs = process.argv.slice(2);
const { createCanvas, loadImage } = require("canvas");
const { layers, width, height } = require("./input/config.js");
const console = require("console");
const { randomInt } = require("crypto");
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");
const editionSize = myArgs.length > 0 ? Number(myArgs[0]) : 1;
var metadata = [];
var attributes = [];
var hash = [];
var decodedHash = [];
let dnaList = [];

const saveLayer = (_canvas, _edition) => {
  fs.writeFileSync(`./output/${_edition}.png`, _canvas.toBuffer("image/png"));
};

const addMetadata = (_edition) => {
  let dateTime = Date.now();
  let tempMetadata = {
    hash: hash.join(""),
    decodedHash: decodedHash,
    edition: _edition,
    date: dateTime,
    attributes: attributes,
  };
  metadata.push(tempMetadata);
  attributes = [];
  hash = [];
  decodedHash = [];
};

const addAttributes = (_element, _layer) => {
  let tempAttr = {
    id: _element.id,
    layer: _layer.name,
    name: _element.name,
    rarity: _element.rarity,
  };
  attributes.push(tempAttr);
  hash.push(_layer.id);
  hash.push(_element.id);
  decodedHash.push({ [_layer.id]: _element.id });
};

const drawLayer = async (_layer, _edition) => {
  let element =
    _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
  addAttributes(element, _layer);
  const image = await loadImage(`${_layer.location}${element.fileName}`);
  ctx.drawImage(
    image,
    _layer.position.x,
    _layer.position.y,
    _layer.size.width,
    _layer.size.height
  );
  saveLayer(canvas, _edition);
};

const isDnaUnique = (_DnaList = [], _dna) => {
  let foundDna = _DnaList.find((i) => i === _dna);
  return foundDna === undefined ? true : false;
}

const createDna = (_len) => {
  let ranNum = Math.floor(
    Number(`1e${_len}`) + Math.random() * Number(`9e${_len}`)
  );
  return ranNum;
};

const writeMetaData = () => {
  fs.writeFileSync("./output/_metadata.json", JSON.stringify(metadata));
};

const startCreating = () => {
  let editionCount = 1;
  while (editionCount <= editionSize) {

    let newDna = createDna(layers.length * 2 - 1);
    console.log(`Random ${newDna}`);
    if (isDnaUnique(dnaList, newDna)) {

      // layers.forEach((layer) => {
      //   drawLayer(layer, i);
      // });
      // addMetadata(i);
      // console.log("Creating editionSize " + i);
      dnaList.push(newDna);
      console.log(dnaList)
      editionCount++;
    } else {
      console.log("DNA Exists!")
    }
  }
};

startCreating();
writeMetaData();
