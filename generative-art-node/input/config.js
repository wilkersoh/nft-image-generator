const { getElements } = require("../libs/fileName");
const fs = require("fs");
const width = 1000;
const height = 1000;
const dir = __dirname;
const description = "Generator NTF images";
const baseImageUri = "https://path/to/ntf/{id}";
const startEditionFrom = 1;
const endEditionAt = 5;
const editionSize = 5;

const raceWeights = [
  {
    value: "eyes",
    from: 1,
    to: 2,
  },
  {
    value: "alien",
    from: 3,
    to: editionSize,
  },
];

const races = {
  eyes: {
    name: "Eyes Ball",
    layers: [
      {
        name: "Background",
        elements: [
          {
            id: 0,
            name: "Light Blue",
            path: `${dir}/1-background/LightBlue.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "Orange",
            path: `${dir}/1-background/Orange.png`,
            weight: 10,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Suit",
        elements: [
          {
            id: 0,
            name: "Orange",
            path: `${dir}/2-suit/Orange.png`,
            weight: 30,
          },
          {
            id: 1,
            name: "Regular",
            path: `${dir}/2-suit/Regular.png`,
            weight: 70,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Shoulder",
        elements: [
          {
            id: 0,
            name: "Luna Flag",
            path: `${dir}/3-shoulder/LunaFlag.png`,
            weight: 40,
          },
          {
            id: 1,
            name: "USA",
            path: `${dir}/3-shoulder/USA.png`,
            weight: 60,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Pin",
        elements: [
          {
            id: 0,
            name: "Luna Blue Pin",
            path: `${dir}/4-pin/LunaBluePin.png`,
            weight: 80,
          },
          {
            id: 1,
            name: "Smiley",
            path: `${dir}/4-pin/Smiley.png`,
            weight: 20,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Skin",
        elements: [
          {
            id: 0,
            name: "Eye Ball",
            path: `${dir}/5-skin/RedEyeBallSuperRare.png`,
            weight: 4,
          },
          {
            id: 1,
            name: "Eye Ball",
            path: `${dir}/5-skin/SmallSuperRare.png`,
            weight: 4,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Facial Hair",
        elements: [
          {
            id: 0,
            name: "No Ficial Hair",
            path: `${dir}/6-facial-hair/NoFacialHair.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Mask",
        elements: [
          {
            id: 0,
            name: "Mask",
            path: `${dir}/7-mask/Mask.png`,
            weight: 55,
          },
          {
            id: 1,
            name: "No Mask",
            path: `${dir}/7-mask/NoMask.png`,
            weight: 45,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Hair",
        elements: [
          {
            id: 0,
            name: "Blonde Bun",
            path: `${dir}/8-hair/BlondeBun.png`,
            weight: 25,
          },
          {
            id: 1,
            name: "Pink",
            path: `${dir}/8-hair/Pink.png`,
            weight: 75,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Accessories",
        elements: [
          {
            id: 0,
            name: "Blonde Bun",
            path: `${dir}/9-accessories/NoAcc.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Head Wear",
        elements: [
          {
            id: 0,
            name: "Glass Dome",
            path: `${dir}/10-headwear/GlassDome.png`,
            weight: 10,
          },
          {
            id: 1,
            name: "Headset",
            path: `${dir}/10-headwear/Headset.png`,
            weight: 15,
          },
          {
            id: 2,
            name: "Helmet",
            path: `${dir}/10-headwear/Helmet.png`,
            weight: 5,
          },
          {
            id: 3,
            name: "NFT Helmet",
            path: `${dir}/10-headwear/NFTHelmet.png`,
            weight: 20,
          },
          {
            id: 4,
            name: "NFT Helmet",
            path: `${dir}/10-headwear/NFTHelmet.png`,
            weight: 10,
          },
          {
            id: 5,
            name: "No Head Wear",
            path: `${dir}/10-headwear/NoHeadwear.png`,
            weight: 15,
          },
          {
            id: 6,
            name: "Robber",
            path: `${dir}/10-headwear/Robber.png`,
            weight: 5,
          },
          {
            id: 7,
            name: "Stealth",
            path: `${dir}/10-headwear/Stealth.png`,
            weight: 20,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
    ],
  },
  alien: {
    name: "Alien",
    layers: [
      {
        name: "Background",
        elements: [
          {
            id: 0,
            name: "Light Blue",
            path: `${dir}/1-background/LightBlue.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "Orange",
            path: `${dir}/1-background/Orange.png`,
            weight: 10,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Suit",
        elements: [
          {
            id: 0,
            name: "Orange",
            path: `${dir}/2-suit/Orange.png`,
            weight: 30,
          },
          {
            id: 1,
            name: "Regular",
            path: `${dir}/2-suit/Regular.png`,
            weight: 70,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Shoulder",
        elements: [
          {
            id: 0,
            name: "Luna Flag",
            path: `${dir}/3-shoulder/LunaFlag.png`,
            weight: 40,
          },
          {
            id: 1,
            name: "USA",
            path: `${dir}/3-shoulder/USA.png`,
            weight: 60,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Pin",
        elements: [
          {
            id: 0,
            name: "Luna Blue Pin",
            path: `${dir}/4-pin/LunaBluePin.png`,
            weight: 80,
          },
          {
            id: 1,
            name: "Smiley",
            path: `${dir}/4-pin/Smiley.png`,
            weight: 20,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Skin",
        elements: [
          {
            id: 0,
            name: "Skull",
            path: `${dir}/5-skin/Skull.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Facial Hair",
        elements: [
          {
            id: 0,
            name: "No Ficial Hair",
            path: `${dir}/6-facial-hair/NoFacialHair.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Mask",
        elements: [
          {
            id: 0,
            name: "Mask",
            path: `${dir}/7-mask/Mask.png`,
            weight: 55,
          },
          {
            id: 1,
            name: "No Mask",
            path: `${dir}/7-mask/NoMask.png`,
            weight: 45,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Hair",
        elements: [
          {
            id: 0,
            name: "Blonde Bun",
            path: `${dir}/8-hair/BlondeBun.png`,
            weight: 25,
          },
          {
            id: 1,
            name: "Pink",
            path: `${dir}/8-hair/Pink.png`,
            weight: 75,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Accessories",
        elements: [
          {
            id: 0,
            name: "Blonde Bun",
            path: `${dir}/9-accessories/NoAcc.png`,
            weight: 100,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
      {
        name: "Head Wear",
        elements: [
          {
            id: 0,
            name: "Glass Dome",
            path: `${dir}/10-headwear/GlassDome.png`,
            weight: 10,
          },
          {
            id: 1,
            name: "Headset",
            path: `${dir}/10-headwear/Headset.png`,
            weight: 15,
          },
          {
            id: 2,
            name: "Helmet",
            path: `${dir}/10-headwear/Helmet.png`,
            weight: 5,
          },
          {
            id: 3,
            name: "NFT Helmet",
            path: `${dir}/10-headwear/NFTHelmet.png`,
            weight: 20,
          },
          {
            id: 4,
            name: "NFT Helmet",
            path: `${dir}/10-headwear/NFTHelmet.png`,
            weight: 10,
          },
          {
            id: 5,
            name: "No Head Wear",
            path: `${dir}/10-headwear/NoHeadwear.png`,
            weight: 15,
          },
          {
            id: 6,
            name: "Robber",
            path: `${dir}/10-headwear/Robber.png`,
            weight: 5,
          },
          {
            id: 7,
            name: "Stealth",
            path: `${dir}/10-headwear/Stealth.png`,
            weight: 20,
          },
        ],
        position: { x: 0, y: 0 },
        size: { width: width, height: height },
      },
    ],
  },
};

module.exports = {
  width,
  height,
  description,
  baseImageUri,
  editionSize,
  startEditionFrom,
  endEditionAt,
  raceWeights,
  races,
};
