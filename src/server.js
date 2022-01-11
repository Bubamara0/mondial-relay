const express = require("express");
const app = express();
require("dotenv").config();
const Joi = require("joi");
const bodyParser = require("body-parser");

const axios = require("axios");

// ---------------------------------------------------------------------------
// Faites "npm i" pour installer tous les modules utilisés dans l'application
// ---------------------------------------------------------------------------

app.get("/", (req, res) => {
	res.send("Our dear homepage");
});

app.use(express.json());

app.use(bodyParser.urlencoded({
	extended: true
  }));

app.post("/prsearch", (req, res) => {
	
	console.log(req.query.nbresults)

	//1: Récupérer et valider le body (requête JSON)

	console.log(req.body)

	const schema = Joi.object({
		Pays: Joi.string()
			.min(2)
			.max(2)
			.required(),
		CP: Joi.number().required()
	})

	const { error } = schema.validate(req.body);

	if(error) {
	  res.status(400).send(`Bad Request!\n${error.details[0].message}`)
	}

	res.status(200).send("Good Request!")

	//2: Construire la requête : headers et body a préparer

	const body = 
	`<?xml version="1.0" encoding="utf-8"?>
	<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
	  <soap:Body>
		<WSI4_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
		  <Enseigne>BDTEST13</Enseigne>
		  <Pays>FR</Pays>
		  <CP>92150</CP>
		  <NombreResultats>10</NombreResultats>
		  <Security>89F920B08B2FAE9990843743804FF848</Security>
		</WSI4_PointRelais_Recherche>
	  </soap:Body>
	</soap:Envelope>`



	
	
	const headers = {
		headers: {
			'content-type': 'text/xml'
		}
	}

	const requestXML = async ()=> {

		const { data } = await axios.post("http://api.mondialrelay.com/Web_Services.asmx?op=WSI4_PointRelais_Recherche", body, headers)
		console.log(data)
	}
	requestXML();
	
	//3: Envoyer la requête et observer la réponse
	//4: Extraire les infos de la réponse
	//5: Construire la réponse (JSON)
	//6: Envoyer la réponse
})


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});

