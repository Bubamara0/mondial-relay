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

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.send("<h1>Our dear homepage (ᵔ◡ᵔ)</h1>");
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
	//3: Envoyer la requête et observer la réponse

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
		</soap:Envelope>`
	;

	const headers = {
		headers: {
			'content-type': 'text/xml'
		}
	};

	const requestXML = async ()=> {
		const { data } = await axios.post("http://api.mondialrelay.com/Web_Services.asmx?op=WSI4_PointRelais_Recherche", body, headers)
		xml2js.parseString(data, function (err, result) {
			const infos = (result["soap:Envelope"]["soap:Body"])[0].WSI4_PointRelais_RechercheResponse[0].WSI4_PointRelais_RechercheResult[0].PointsRelais[0].PointRelais_Details[0];
			res.status(200).send(infos);
		});
	};
	requestXML();
	
	//4: Extraire les infos de la réponse
	//5: Construire la réponse (JSON)
	//6: Envoyer la réponse
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
