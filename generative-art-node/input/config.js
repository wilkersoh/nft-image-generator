const fs = require("fs");
const width = 1000;
const height = 1000;
const dir = __dirname;
const description = "This is an NFT made by the coolest generative code.";
const baseImageUri = "https://hashlips/nft";
const startEditionFrom = 1;
const endEditionAt = 10;
const editionSize = 100;

const raceWeights = [
  // {
  //   value: "eyes",
  //   from: 1,
  //   to: 15,
  // },
  {
    value: "alien",
    from: 1,
    to: 10,
    // to: editionSize,
  },
];

const races = {
  /**
   * Weight amount must same as total
   */
  alien: {
    name: "Alien",
    layers: [
      {
        name: "Background",
        elements: [
          {
            id: 0,
            name: "Light Blue",
            path: `${dir}/alien/1-background/LightBlue.png`,
            weight: 100,
          },
          {
            id: 1,
            name: "Orange",
            path: `${dir}/alien/1-background/Orange.png`,
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
            path: `${dir}/alien/2-suit/Orange.png`,
            weight: 30,
          },
          {
            id: 1,
            name: "Regular",
            path: `${dir}/alien/2-suit/Regular.png`,
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
            path: `${dir}/alien/3-shoulder/LunaFlag.png`,
            weight: 40,
          },
          {
            id: 1,
            name: "USA",
            path: `${dir}/alien/3-shoulder/USA.png`,
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
            path: `${dir}/alien/4-pin/LunaBluePin.png`,
            weight: 80,
          },
          {
            id: 1,
            name: "Smiley",
            path: `${dir}/alien/4-pin/Smiley.png`,
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
            path: `${dir}/alien/5-skin/Skull.png`,
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
            path: `${dir}/alien/6-facial-hair/NoFacialHair.png`,
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
            path: `${dir}/alien/7-mask/Mask.png`,
            weight: 55,
          },
          {
            id: 1,
            name: "No Mask",
            path: `${dir}/alien/7-mask/NoMask.png`,
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
            path: `${dir}/alien/8-hair/BlondeBun.png`,
            weight: 25,
          },
          {
            id: 1,
            name: "Pink",
            path: `${dir}/alien/8-hair/Pink.png`,
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
            path: `${dir}/alien/9-accessories/NoAcc.png`,
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
            path: `${dir}/alien/10-headwear/GlassDome.png`,
            weight: 10,
          },
          {
            id: 1,
            name: "Headset",
            path: `${dir}/alien/10-headwear/Headset.png`,
            weight: 15,
          },
          {
            id: 2,
            name: "Helmet",
            path: `${dir}/alien/10-headwear/Helmet.png`,
            weight: 5,
          },
          {
            id: 3,
            name: "NFT Helmet",
            path: `${dir}/alien/10-headwear/NFTHelmet.png`,
            weight: 20,
          },
          {
            id: 4,
            name: "NFT Helmet",
            path: `${dir}/alien/10-headwear/NFTHelmet.png`,
            weight: 10,
          },
          {
            id: 5,
            name: "No Head Wear",
            path: `${dir}/alien/10-headwear/NoHeadwear.png`,
            weight: 15,
          },
          {
            id: 6,
            name: "Robber",
            path: `${dir}/alien/10-headwear/Robber.png`,
            weight: 5,
          },
          {
            id: 7,
            name: "Stealth",
            path: `${dir}/alien/10-headwear/Stealth.png`,
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
