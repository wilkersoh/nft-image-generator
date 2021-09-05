const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const {
  width,
  height,
  description,
  baseImageUri,
  startEditionFrom,
  endEditionAt,
  raceWeights,
  races,
} = require("./input/config.js");
const console = require("console");
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");
const QUIT_LOOP = 50;
var metadataList = [];
var attributesList = [];
let dnaList = [];

const saveImage = (_editionCount) => {
  fs.writeFileSync(
    `./output/${_editionCount}.png`,
    canvas.toBuffer("image/png")
  );
};

const signImage = (_sign) => {
  ctx.fileStyle = "#000000";
  ctx.font = "Bold 30pt Courier";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillText(_sign, 40, 40);
};

const genColor = () => {
  let hue = Math.floor(Math.random() * 360);
  let pastel = `hsl(${hue}, 100%, 85%)`;
  return pastel;
};

const drawBackground = () => {
  ctx.fillStyle = genColor();
  ctx.fillRect(0, 0, width, height);
};

const addMetadata = (_dna, _edition) => {
  let dateTime = Date.now();
  let tempMetadata = {
    dna: _dna.join(""),
    name: `#${_edition}`,
    description: description,
    image: `${baseImageUri}/${_edition}`,
    edition: _edition,
    date: dateTime,
    attributes: attributesList,
  };
  metadataList.push(tempMetadata);
  attributesList = [];
};

const addAttributes = (_element) => {
  let selectedElement = _element.layer.selectedElement;
  attributesList.push({
    trait_type: _element.layer.name,
    value: selectedElement.name,
  });
};

const loadLayerImg = async (_layer) => {
  return new Promise(async (resolve) => {
    const image = await loadImage(
      `${_layer.selectedElement.path}`
    );
    resolve({ layer: _layer, loadedImage: image });
  });
};

const drawElement = (_element) => {
  ctx.drawImage(
    _element.loadedImage,
    _element.layer.position.x,
    _element.layer.position.y,
    _element.layer.size.width,
    _element.layer.size.height
  );
  addAttributes(_element);
} ;

const constructLayerToDna = (_dna = [], _races = [], _race) => {
  let mappedDnaToLayers = _races[_race].layers.map((layer, index) => {

    const selectedElement = layer.elements.find(e => e.id == _dna[index]);
    return {
      name: layer.name,
      position: layer.position,
      size: layer.size,
      selectedElement: selectedElement,
    };
  });
  return mappedDnaToLayers;
};

const getRace = (_editionCount) => {
  let race = "";
  raceWeights.forEach(raceWeights => {
    if (
      _editionCount >= raceWeights.from &&
      _editionCount <= raceWeights.to
    ) {
      race = raceWeights.value;
    }
  })
  return race;
}

const isDnaUnique = (_DnaList = [], _dna = []) => {
  let foundDna = _DnaList.find((i) => i.join("") === _dna.join(""));
  return foundDna === undefined ? true : false;
};

const createDna = (_races, _race) => {
  let randNum = [];

  _races[_race].layers.forEach((layer) => {
    let randElementNum = Math.floor(Math.random() * 100);
    let num = 0;

    layer.elements.forEach(element => {
      // 35 >= 100 - 10
      if(randElementNum >= 100 - element.weight) {
        num = element.id;
      }
    })

    randNum.push(num);
  });
  return randNum;
};

const writeMetaData = (_data) => {
  fs.writeFileSync("./output/_metadata.json", _data);
};

const startCreating = async () => {
  console.log("------------------- Start! ---------------------")
  // reset metaData
  writeMetaData("");
  let editionCount = startEditionFrom;
  let duplicatedCount = 0;

  while (editionCount <= endEditionAt) {

    const race = getRace(editionCount);
    const newDna = createDna(races, race);

    if (isDnaUnique(dnaList, newDna)) {
      const results = constructLayerToDna(newDna, races, race);

      const loadedElements = []; // Promises

      results.forEach((layer) => {
        loadedElements.push(loadLayerImg(layer)); // return promise
      });
      await Promise.all(loadedElements).then((elementArray) => {

        elementArray.forEach((element) => {
          drawElement(element);
        });

        signImage(`#${editionCount}`);

        saveImage(editionCount);
        addMetadata(newDna, editionCount);
        console.log(`Created #${editionCount} ${race} with ID: ${newDna}`);
      });

      dnaList.push(newDna);
      editionCount++;
    } else {
      duplicatedCount++
      console.log("Image Exists!");
      // if(QUIT_LOOP === duplicatedCount) {
      //   console.log("Quit loop and generating meta");
      //   break;
      // }
    }
  }

  writeMetaData(JSON.stringify(metadataList));
};

startCreating();
