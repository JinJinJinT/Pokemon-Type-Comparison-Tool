/**
 * This is the NodeJS code for the Pokemon type comparison tool. It implements
 * two express server endpoints for an API. The first endpoint is for getting
 * all the available Pokemon types and the second endpoint is for getting the image URL
 * for a given type.
 */
"use strict";
const express = require("express");
const app = express();
const constants = require("./constants");
const [types, images] = constants;

/**
 * A GET endpoint which responds with all of the Pokemon types as plaintext.
 */
app.get("/types", (req, res) => {
  res.type("text");
  if (types.length < 1) {
    res.status(500).send("No types found in server");
  } else {
    let [first, ...rest] = types;
    res.send(rest.reduce((curr, next) => `${curr}\n${next}`, first));
  }
});

/**
 * A GET endpoint which responds with a JSON containing the type and the image URL containing
 * the icon for the given type in the parameter.
 */
app.get("/image/:type", (req, res) => {
  res.type("json");
  let type = req.params.type;
  if (types.indexOf(type) === -1) {
    res.status(400).send({ error: `${type} is an Invalid type` });
  } else {
    let response = images[type];
    res.send(JSON.stringify(response));
  }
});

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
