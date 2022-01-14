const parseString = require('xml2js').parseString;
const express = require("express");
const app = express();
require("dotenv").config();
const Joi = require("joi");


const bodyParser = require("body-parser");
const axios = require("axios");
const md5 = require("md5");
const { response } = require("express");
const xml2js = require("xml2js");


const cpRequest = require("./cpRequest");
const villeRequest = require("./villeRequest");
const villeCpRequest = require("./villeCpRequest");

// ---------------------------------------------------------------------------
// Faites "npm i" pour installer tous les modules utilisés dans l'application
// ---------------------------------------------------------------------------

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.send("<h1>Our dear homepage (ᵔ◡ᵔ)</h1>");
});

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