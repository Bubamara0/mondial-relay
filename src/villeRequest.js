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

const villeRequest = async (req,res) => {


const schema = Joi.object({
Pays: Joi.string().min(2).max(2).required(),
});

const { error } = schema.validate(req.body);
if(error) {
res.status(400).send(`Bad Request!\n${error.details[0].message}`);
};

const security = md5("BDTEST13" + req.body.Pays + req.params.ville + req.query.nbresults + "PrivateK").toUpperCase();
console.log(security);

const body = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
<WSI4_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
<Enseigne>BDTEST13</Enseigne>
<Pays>${req.body.Pays}</Pays>
<Ville>${req.params.ville}</Ville>
<NombreResultats>${req.query.nbresults}</NombreResultats>
<Security>${security}</Security>
</WSI4_PointRelais_Recherche>
</soap:Body>
</soap:Envelope>`;

console.log(req.query.nbresults);
const headers = {
headers: {
'content-type': 'text/xml'
}
};


const requestXML = async ()=> {

const { data } = await axios.post("http://api.mondialrelay.com/Web_Services.asmx?op=WSI4_PointRelais_Recherche", body, headers)


xml2js.parseString(data, function (err, result) {

const formatingError = (result["soap:Envelope"]["soap:Body"])[0].WSI4_PointRelais_RechercheResponse[0].WSI4_PointRelais_RechercheResult[0].STAT[0]

if((result["soap:Envelope"]["soap:Body"])[0].WSI4_PointRelais_RechercheResponse[0].WSI4_PointRelais_RechercheResult[0].PointsRelais === undefined) {
    return res.status(400).send(`Bad Request! API status code: ${formatingError}`)
}

const beforeFormating = (result["soap:Envelope"]["soap:Body"])[0].WSI4_PointRelais_RechercheResponse[0].WSI4_PointRelais_RechercheResult[0].PointsRelais[0].PointRelais_Details

const reformating = [];

beforeFormating.forEach((e) => {
const template = {
Num : e.Num[0],
Adresse : `${e.LgAdr1[0].trim()}, ${e.LgAdr3[0].trim()}`,
Adresse2 : `${e.LgAdr2[0].trim()}, ${e.LgAdr4[0].trim()}`,
"Code Postal" : e.CP[0],
Ville : e.Ville[0].trim(),
Pays : e.Pays[0],
Localisation : [
    e.Localisation1[0].trim(),
    e.Localisation2[0].trim()
],
Coordonnees : {
    Longitude : e.Longitude[0],
    Latitude: e.Latitude[0]
},
Horaires : {
    Lundi : `${e.Horaires_Lundi[0].string[0][1]}h${e.Horaires_Lundi[0].string[0][2]}${e.Horaires_Lundi[0].string[0][3]} - ${e.Horaires_Lundi[0].string[1][0]}${e.Horaires_Lundi[0].string[1][1]}h${e.Horaires_Lundi[0].string[1][2]}${e.Horaires_Lundi[0].string[1][3]}`,
    Mardi : `${e.Horaires_Mardi[0].string[0][1]}h${e.Horaires_Mardi[0].string[0][2]}${e.Horaires_Mardi[0].string[0][3]} - ${e.Horaires_Mardi[0].string[1][0]}${e.Horaires_Mardi[0].string[1][1]}h${e.Horaires_Mardi[0].string[1][2]}${e.Horaires_Mardi[0].string[1][3]}`,
    Mercredi : `${e.Horaires_Mercredi[0].string[0][1]}h${e.Horaires_Mercredi[0].string[0][2]}${e.Horaires_Mercredi[0].string[0][3]} - ${e.Horaires_Mercredi[0].string[1][0]}${e.Horaires_Mercredi[0].string[1][1]}h${e.Horaires_Mercredi[0].string[1][2]}${e.Horaires_Mercredi[0].string[1][3]}`,
    Jeudi : `${e.Horaires_Jeudi[0].string[0][1]}h${e.Horaires_Jeudi[0].string[0][2]}${e.Horaires_Jeudi[0].string[0][3]} - ${e.Horaires_Jeudi[0].string[1][0]}${e.Horaires_Jeudi[0].string[1][1]}h${e.Horaires_Jeudi[0].string[1][2]}${e.Horaires_Jeudi[0].string[1][3]}`,
    Vendredi : `${e.Horaires_Vendredi[0].string[0][1]}h${e.Horaires_Vendredi[0].string[0][2]}${e.Horaires_Vendredi[0].string[0][3]} - ${e.Horaires_Vendredi[0].string[1][0]}${e.Horaires_Vendredi[0].string[1][1]}h${e.Horaires_Vendredi[0].string[1][2]}${e.Horaires_Vendredi[0].string[1][3]}`,
    Samedi : `${e.Horaires_Samedi[0].string[0][1]}h${e.Horaires_Samedi[0].string[0][2]}${e.Horaires_Samedi[0].string[0][3]} - ${e.Horaires_Samedi[0].string[1][0]}${e.Horaires_Samedi[0].string[1][1]}h${e.Horaires_Samedi[0].string[1][2]}${e.Horaires_Samedi[0].string[1][3]}`,
    Dimanche : `${e.Horaires_Dimanche[0].string[0][1]}h${e.Horaires_Dimanche[0].string[0][2]}${e.Horaires_Dimanche[0].string[0][3]} - ${e.Horaires_Dimanche[0].string[1][0]}${e.Horaires_Dimanche[0].string[1][1]}h${e.Horaires_Dimanche[0].string[1][2]}${e.Horaires_Dimanche[0].string[1][3]}`
},
Photo : e.URL_Photo[0],
Plan : e.URL_Plan[0],
Distance : `${e.Distance} m`
}
const tabLocalisation = template.Localisation

if(tabLocalisation[0] === "" && tabLocalisation[1] === "") {
    delete template.Localisation;
}

reformating.push(template);
});

res.status(200).send(reformating);

});

}
requestXML();

}

module.exports = villeRequest;