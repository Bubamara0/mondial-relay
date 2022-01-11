const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const Joi = require("joi");
const ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// ---------------------------------------------------------------------------
// Faites "npm i" pour installer tous les modules utilisés dans l'application
// ---------------------------------------------------------------------------

app.get("/", (req, res) => {
	// Temporaire :
	res.render("index");
});

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});