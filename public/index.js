/*
 * Jin Terada White
 * Instructor: Tal Wolman
 * Section AG (Donovan and Austin)
 * CP4 - Pokemon Type Comparision With Node
 * This file contains the javascript behavior for a Pokemon type comparision tool.
 * The user can select two types and the program will display the type matchups.
 * It uses the pokeapi to get the type matchups found at https://pokeapi.co/docs/v2#types/.
 */
"use strict";
(function () {
  const BASE_URL = "https://pokeapi.co/api/v2/type/";

  let type1 = "";
  let type2 = "";

  window.addEventListener("load", () => {
    id("start").addEventListener("click", populateTypes);
  });

  /**
   * Fills the selector tool with images of each pokemon type.
   * The user can click each image to select a type to use the comparison tool.
   * The available types and image url's are retrived from the Node API.
   * Displays a loading screen while the data is being retrieved.
   */
  async function populateTypes() {
    startLoading();
    const types = await getTypes();
    for (let i = 0; i < types.length; i++) {
      let type = types[i];
      let option = document.createElement("input");
      option.type = "image";
      option.src = await getImageURL(type);
      option.alt = `Symbol for a ${type} type Pokemon`;
      option.id = type;
      option.classList.add("type");
      option.addEventListener("click", clicked);
      document.getElementById("selector").appendChild(option);
    }
    id("start").remove();
    id("selector").classList.remove("hidden");
    id("results").classList.remove("hidden");
  }

  /**
   * Starts the loading screen. Used while grabbing the types and images.
   */
  function startLoading() {
    qs("#start h3").textContent = "Loading...";
    qs("button").disabled = true;
  }

  /**
   * Gets and processes the plaintext of all Pokemon types from the Node API.
   * @returns {string[]} An array of all Pokemon types
   */
  async function getTypes() {
    let response = await makeRequest("/types");
    return response.split("\n");
  }

  /**
   * Gets and process JSON returned from the Node API for a given type.
   * @param {string} type The type to get the JSON for
   * @returns {string} The URL of the image for the given type
   */
  async function getImageURL(type) {
    let response = await makeRequest(`/image/${type}`);
    return response.url;
  }

  /**
   * Handles the user clicking on a type image. When an image is selected, it
   * has a box around it. When two types are selected, it will make a request to
   * the pokemon api and process the response to display the type matchups to the user.
   */
  function clicked() {
    let type = this.id;

    if (type1 === "") {
      type1 = type; // nothing is selected -> set type1
      this.classList.add("selected1");
    } else if (type1 === type) {
      type1 = ""; // type1 was selected again -> unselect type1
      this.classList.remove("selected1");
    } else if (type2 === "") {
      type2 = type; // type1 selected but not type2 -> set type2
      this.classList.add("selected2");
    } else if (type2 === type) {
      type2 = ""; // type2 selected again -> unselect type2
      this.classList.remove("selected2");
    } else {
      id(type2).classList.remove("selected2");
      type2 = type; // new type2 selected -> update type2
      this.classList.add("selected2");
    }

    let pokemon1 = document.getElementById("first-pokemon");
    let pokemon2 = document.getElementById("second-pokemon");

    pokemon1.textContent = type1;
    pokemon2.textContent = type2;

    if (type1 !== "" && type2 !== "") {
      getTypeMatchups();
    } else {
      setText("Select two types to compare!");
    }
  }

  /**
   * Called when there are two types selected by the user. Uses the types to make
   * a request to the Pokemon API. It processes the response into meaningful text
   * and displays it to the user.
   */
  async function getTypeMatchups() {
    let type1Response = await makeRequest(BASE_URL + type1);
    let relation = processData(type1Response);
    let result = stringifyRelations(relation);
    setText(result);
  }

  /**
   * Makes a request to the pokemon api depending on the passed in endpoint and
   * returns the response.
   * @param {string} endpoint The endpoint to make the request to.
   * @param {object} requestOptions An optional parameter which is an empty object
   * by default (for GET requests). Should contain the parameters and options for
   * any POST requests made.
   * @return {(object|string)} A JSON object or a plaintext string depending on the
   * format of the response.
   * @throws Will console.error() and throw the error if the request fails.
   */
  async function makeRequest(endpoint, requestOptions = {}) {
    try {
      let response = await fetch(endpoint, requestOptions);
      await statusCheck(response);
      let data = await response.text();
      return isValidJSON(data);
    } catch (e) {
      handleError(e);
    }
  }

  /**
   * Checks whether the passed in string is a valid JSON string.
   * @param {string} data The string to check.
   * @return {(object|string)} The parsed JSON object if the string is valid JSON,
   * or the original string if not.
   */
  function isValidJSON(data) {
    let json;
    try {
      json = JSON.parse(data);
    } catch (e) {
      return data;
    }
    return json;
  }

  /**
   * Processes the object returned from the pokemon api about the first type
   * and returns the relation it has with the second type.
   * @param {object} responseData The object returned from the pokemon api about the first type
   * @return {string} The relation the first type has with the second type. If there
   * is no special relation it returns and empty string "".
   */
  function processData(responseData) {
    const damageRelations = responseData.damage_relations;
    for (let relationName in damageRelations) {
      if (!relationName.includes("from")) {
        let relation = damageRelations[relationName];
        for (let id in relation) {
          let type = relation[id].name;
          if (type === type2) {
            return relationName;
          }
        }
      }
    }
    return "";
  }

  /**
   * Sets the results section to the passed in string.
   * @param {string} text The text to display in the results section.
   */
  function setText(text) {
    document.querySelector("#results p").textContent = text;
  }

  /**
   * Takes in the relation between the two types and turns it into meaningful text.
   * @param {string} relation Must be one of the possible relations of:
   * "no_damage_from", "half_damage_from", "double_damage_from", or "". An empty string
   * means that the relationsip between the two types is normal.
   * @returns {string} Meangful text describing the relation between the two types.
   */
  function stringifyRelations(relation) {
    const categories = ["double_damage_to", "half_damage_to", "no_damage_to"];
    let t1 = type1.charAt(0).toUpperCase() + type1.slice(1);
    let t2 = type2.charAt(0).toUpperCase() + type2.slice(1);
    if (relation === "") {
      return `${t1} attacks deal normal damage to ${t2} Pokemon.`;
    }
    if (relation === categories[0]) {
      return `${t1} attacks are super effective on ${t2} Pokemon!`;
    }
    if (relation === categories[1]) {
      return `${t1} attacks are not very effective on ${t2} Pokemon`;
    }
    if (relation === categories[2]) {
      return `${t1} attacks deal no damage to ${t2} Pokemon.`;
    }
  }

  /**
   * String representations of errors are passed to this method so that it can
   * be displayed to the user.
   * @param {string} err The error to display.
   */
  function handleError(err) {
    setText(err);
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }
})();
