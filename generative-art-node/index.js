const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const {
  layers,
  width,
  height,
  description,
  baseImageUri,
  startEditionFrom,
  endEditionAt,
  rarityWeights,
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
    name: selectedElement.name,
    rarity: selectedElement.rarity,
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
};

const constructLayerToDna = (_dna = [], _layers = [], _rarity) => {
  // let DnaSegment = _dna.toString().match(/.{1,2}/g);

  let mappedDnaToLayers = _layers.map((layer, index) => {
    const selectedElement = layer.elements[_rarity][_dna[index]];

    return {
      location: layer.location,
      position: layer.position,
      size: layer.size,
      selectedElement: selectedElement,
    };
  });
  return mappedDnaToLayers;
};

const getRarity = (_editionCount) => {
  let rarity = "";
  rarityWeights.forEach(rarityWeight => {
    /**
     * _editionCount between from and to value
     * eg:
     * _editionCount = 1
     * rarityWeight.from = 1
     * rarityWeight.to = 1
     * then true only once
     * it is equal than 1 from "from"
     *
     * _editionCount = 2
     * rarityWeight.from = 2
     * rarityWeight.to = 5
     * then true, three times
     * it is equal than 2 from "from" and until before 5
     */
    if (
      _editionCount >= rarityWeight.from &&
      _editionCount <= rarityWeight.to
    ) {
      rarity = rarityWeight.value;
    }
  })
  return rarity;
}

const isDnaUnique = (_DnaList = [], _dna = []) => {
  let foundDna = _DnaList.find((i) => i.join("") === _dna.join(""));
  return foundDna === undefined ? true : false;
};

const createDna = (_layers, _rarity) => {
  let randNum = [];
  _layers.forEach((layer) => {
    let num = Math.floor(Math.random() * layer.elements[_rarity].length);
    randNum.push(num);
  });
  return randNum;
};

const writeMetaData = (_data) => {
  fs.writeFileSync("./output/_metadata.json", _data);
};

const startCreating = async () => {
  console.log("Start!")
  // reset metaData
  writeMetaData("");
  let editionCount = startEditionFrom;
  let duplicatedCount = 0;

  while (editionCount <= endEditionAt) {
    const rarity = getRarity(editionCount);
    const newDna = createDna(layers, rarity);
    // console.log(`rarity::: `, rarity)
    if (isDnaUnique(dnaList, newDna)) {
      const results = constructLayerToDna(newDna, layers, rarity);
      const loadedElements = []; // Promises

      console.log(dnaList);
      results.forEach((layer) => {
        loadedElements.push(loadLayerImg(layer)); // return promise
      });
      await Promise.all(loadedElements).then((elementArray) => {
        // clear background
        // ctx.clearRect(0, 0, width,height)
        // drawBackground();

        elementArray.forEach((element) => {
          drawElement(element);
        });

        signImage(`#${editionCount}`);

        saveImage(editionCount);
        addMetadata(newDna, editionCount);
        console.log(`Created editotion : ${editionCount} with DNA: ${newDna}`);
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
