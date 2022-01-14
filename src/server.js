/* ---------------------------------------------------------------
# MODULE IMPORTS
--------------------------------------------------------------- */
const axios = require("axios");
const express = require("express");
const app = express();
const parseString = require('xml2js').parseString;
const ejs = require("ejs");
const Joi = require("joi");
const bodyParser = require("body-parser");
const md5 = require("md5");
const { response } = require("express");
const xml2js = require("xml2js");
require("dotenv").config();

/* ---------------------------------------------------------------
# EXTERNAL SCRIPTS IMPORTS
--------------------------------------------------------------- */
const cpRequest = require("./cpRequest");
const villeRequest = require("./villeRequest");
const villeCpRequest = require("./villeCpRequest");
const coordonneesRequest = require("./coordonnesRequest");

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
app.post("/prsearch/cp/:cp", (req,res) => cpRequest(req,res));
app.post("/prsearch/city/:ville", (req,res) => villeRequest(req,res));
app.post("/prsearch/:cp/:ville", (req,res) => villeCpRequest(req,res));

const PORT = process.env.port || 8080

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});

app.post("/prsearch/cp/:cp", (req,res) => {
	cpRequest(req,res);
})

app.post("/prsearch/city/:ville", (req,res) => {
	villeRequest(req,res);
})

app.post("/prsearch/:cp/:ville", (req,res) => {
	villeCpRequest(req,res);
})

app.post("/prsearch/coordonnees", (req,res) => {
	coordonneesRequest(req,res);
})
