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
const cors = require("cors");

/* ---------------------------------------------------------------
# EXTERNAL SCRIPTS IMPORTS
--------------------------------------------------------------- */

const cpRequest = require("./cpRequest");
const villeRequest = require("./villeRequest");
const villeCpRequest = require("./villeCpRequest");
const coordonneesRequest = require("./coordonnesRequest");
const creationEtiquette = require("./creationEtiquette");
const villeCpRequestWeb = require("./villeCpRequestWeb");

/* ---------------------------------------------------------------
# SERVER SETTINGS
--------------------------------------------------------------- */
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));
app.use(cors());

/* ---------------------------------------------------------------
# ROUTES SETTINGS
--------------------------------------------------------------- */
app.use("/prsearch", cpRequest, villeRequest, villeCpRequest, coordonneesRequest, villeCpRequestWeb);
app.use("/creationEtiquette", creationEtiquette);

/* ---------------------------------------------------------------
# SERVER LAUNCHING
--------------------------------------------------------------- */
const PORT = process.env.port || 8080;
app.listen(PORT, ()=> console.log(`Back-end server started on http://localhost:${PORT}`));