"use strict";
/**
 * List of all Pokemon types.
 */
const types = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water"
];

/**
 * All possible objects used by the API.
 */
const images = {
  bug: {
    name: "bug",
    url: "https://i.imgur.com/rnDqgNC.png"
  },
  dark: {
    name: "dark",
    url: "https://i.imgur.com/yKjgV2Q.png"
  },
  dragon: {
    name: "dragon",
    url: "https://i.imgur.com/byYrYo1.png"
  },
  electric: {
    name: "electric",
    url: "https://i.imgur.com/lBtcVoh.png"
  },
  fairy: {
    name: "fairy",
    url: "https://i.imgur.com/NfHYbEG.png"
  },
  fighting: {
    name: "fighting",
    url: "https://i.imgur.com/P33EIDF.png"
  },
  fire: {
    name: "fire",
    url: "https://i.imgur.com/kIxRukC.png"
  },
  flying: {
    name: "flying",
    url: "https://i.imgur.com/9Yq1rDM.png"
  },
  ghost: {
    name: "ghost",
    url: "https://i.imgur.com/mjtGGDw.png"
  },
  grass: {
    name: "grass",
    url: "https://i.imgur.com/09cpQYA.png"
  },
  ground: {
    name: "ground",
    url: "https://i.imgur.com/mcbkKFI.png"
  },
  ice: {
    name: "ice",
    url: "https://i.imgur.com/jnj87O7.png"
  },
  normal: {
    name: "normal",
    url: "https://i.imgur.com/hCdUjGi.png"
  },
  poison: {
    name: "poison",
    url: "https://i.imgur.com/Hr0FFZA.png"
  },
  psychic: {
    name: "psychic",
    url: "https://i.imgur.com/mF59P4q.png"
  },
  rock: {
    name: "rock",
    url: "https://i.imgur.com/2HQTKB3.png"
  },
  steel: {
    name: "steel",
    url: "https://i.imgur.com/AQ8A2Pb.png"
  },
  water: {
    name: "water",
    url: "https://i.imgur.com/okKBDxP.png"
  }
};

module.exports = [types, images];
