const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const Joi = require("joi");

// ---------------------------------------------------------------------------
// Faites "npm i" pour installer tous les modules utilisés dans l'application
// ---------------------------------------------------------------------------

app.get("/", (req, res) => {
	// res.send() temporaire :
	res.send(`
		<h1>Our dear homepage</h1>
		<ul>
			<li><a href="http://api.mondialrelay.com/Web_Services.asmx" target="__blank">Mondial Relay - WSI2_RechercheCP</a></li>
			<li><a href="https://www.mondialrelay.fr/media/122867/solution-web-service-v57.pdf" target="__blank">Mondial Relay - Web Service PDF</a></li>
		</ul>
	`);
});

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});