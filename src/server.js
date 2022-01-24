/* ---------------------------------------------------------------
# MODULE IMPORTS
--------------------------------------------------------------- */
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { response, Router } = require("express");
require("dotenv").config();

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
app.set("views engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

/* ---------------------------------------------------------------
# ROUTES SETTINGS
--------------------------------------------------------------- */
app.get("/", (req, res) => res.render("index"));

app.use("/prsearch", cpRequest, villeRequest, villeCpRequest, coordonneesRequest);

app.use("/creationEtiquette", creationEtiquette);
// app.use("/prsearch", villeRequest);
// app.post("/prsearch/cp/:cp", (req,res) => cpRequest(req,res));
// app.post("/prsearch/city/:ville", (req,res) => villeRequest(req,res));
// app.post("/prsearch/:cp/:ville", (req,res) => villeCpRequest(req,res));
// app.post("/prsearch/coordonnees", (req,res) => coordonneesRequest(req,res));

/* ---------------------------------------------------------------
# SERVER LAUNCHING
--------------------------------------------------------------- */
const PORT = process.env.port || 8080;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));