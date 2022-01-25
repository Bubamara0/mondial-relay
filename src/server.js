/* ---------------------------------------------------------------
# MODULE IMPORTS
--------------------------------------------------------------- */
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { response, Router } = require("express");
require("dotenv").config();
const morgan = require("morgan");

/* ---------------------------------------------------------------
# EXTERNAL SCRIPTS IMPORTS
--------------------------------------------------------------- */

const cpRequest = require("./cpRequest");
const villeRequest = require("./villeRequest");
const villeCpRequest = require("./villeCpRequest");
const coordonneesRequest = require("./coordonnesRequest");

const creationEtiquette = require("./creationEtiquette");

/* ---------------------------------------------------------------
# SERVER SETTINGS
--------------------------------------------------------------- */
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(morgan('combined'));

/* ---------------------------------------------------------------
# ROUTES SETTINGS
--------------------------------------------------------------- */
app.get("/", (req, res) => res.render("index"));

app.use("/prsearch", cpRequest, villeRequest, villeCpRequest, coordonneesRequest);

app.use("/creationEtiquette", creationEtiquette);

/* ---------------------------------------------------------------
# SERVER LAUNCHING
--------------------------------------------------------------- */
const PORT = process.env.port || 8080;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));