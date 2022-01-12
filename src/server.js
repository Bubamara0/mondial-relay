const parseString = require('xml2js').parseString;
const express = require("express");
const app = express();
require("dotenv").config();
const Joi = require("joi");
const bodyParser = require("body-parser");

const axios = require("axios");
const md5 = require("md5");

// ---------------------------------------------------------------------------
// Faites "npm i" pour installer tous les modules utilisés dans l'application
// ---------------------------------------------------------------------------

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.send("Our dear homepage");
});

app.post("/prsearch", (req, res) => {
	// console.log(req.body);
	// console.log(req.query.nbresults);

	//1: Récupérer et valider le body (requête JSON)
	const schema = Joi.object({
		Pays: Joi.string().min(2).max(2).required(),
		CP: Joi.number().required()
	});

	const { error } = schema.validate(req.body);
	if(error) {
	  res.status(400).send(`Bad Request!\n${error.details[0].message}`);
	};

	//2: Construire la requête : headers et body a préparer
	const security = md5("BDTEST13" + req.body.Pays + req.body.CP + req.query.nbresults + "PrivateK").toUpperCase();
	console.log(security);

	const body = `<?xml version="1.0" encoding="utf-8"?>
		<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
		<soap:Body>
			<WSI4_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
			<Enseigne>BDTEST13</Enseigne>
			<Pays>${req.body.Pays}</Pays>
			<CP>${req.body.CP}</CP>
			<NombreResultats>${req.query.nbresults}</NombreResultats>
			<Security>${security}</Security>
			</WSI4_PointRelais_Recherche>
		</soap:Body>
		</soap:Envelope>`;

	const headers = {
		headers: {
			'content-type': 'text/xml'
		}
	};

	const requestXML = async () => {
		const { data } = await axios.post("http://api.mondialrelay.com/Web_Services.asmx?op=WSI4_PointRelais_Recherche", body, headers);
		try {
			parseString(data, (request, result) => {
				const parseResult = JSON.parse(result);
				res.status(200).send(result);
			});
		} catch (err) {
			console.log(err.message);
		};
	};
	requestXML();
	
	//3: Envoyer la requête et observer la réponse
	//4: Extraire les infos de la réponse
	//5: Construire la réponse (JSON)
	//6: Envoyer la réponse
});

app.listen(process.env.PORT || 8080, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
