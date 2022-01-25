/* ---------------------------------------------------------------
# MODULE IMPORTS
--------------------------------------------------------------- */
const axios = require("axios");
const express = require("express");
const app = express();
const Joi = require("joi");
const bodyParser = require("body-parser");
const md5 = require("md5");
const { response } = require("express");
const xml2js = require("xml2js");
const router = express.Router();


/* ---------------------------------------------------------------
# SERVER SETTINGS
--------------------------------------------------------------- */
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

/* ---------------------------------------------------------------
# SCRIPT START
--------------------------------------------------------------- */

router.post("/", (req, res) => {
    
	const schema = Joi.object({
		ModeCol : Joi.string().max(3).min(3).required(),
        ModeLiv : Joi.string().max(3).min(3).required(),
        Langage_expediteur : Joi.string().max(2).min(2).required(),
        Nom_expediteur : Joi.string().max(32).required(),
        Rue_expediteur : Joi.string().max(32).required(),
        Ville_expediteur : Joi.string().max(26).required(),
        Code_postal_expediteur : Joi.string().required(),
        Pays_expediteur : Joi.string().max(2).min(2).required(),
        Telephone_expediteur : Joi.string().required(),
        Mail_expediteur : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required(),
        Langage_destinataire : Joi.string().max(2).min(2).required(),
        Nom_destinataire : Joi.string().max(32).required(),
        Rue_destinataire : Joi.string().max(32).required(),
        Ville_destinataire : Joi.string().max(26).required(),
        Code_postal_destinataire : Joi.string().required(),
        Pays_destinataire : Joi.string().max(2).min(2).required(),
        Telephone_destinataire : Joi.string().required(),
        Mail_destinataire : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required(),
        Poids : Joi.string().min(1).max(7).required(),
        Nombre_colis : Joi.string().min(1).max(2).required(),
        Montant_contre_remboursement : Joi.string().min(1).max(7).required(),
        COL_Rel_Pays : Joi.string().max(2).min(2).required(),
        COL_Rel : Joi.string().max(6).min(1).required(),
        LIV_Rel_Pays : Joi.string().max(2).min(2).required(),
        LIV_Rel : Joi.string().max(6).min(1).required(),
	});

	const { error } = schema.validate(req.body);
	if (error) res.status(400).send(`Bad Request!\n${error.details[0].message}`);

	const security = md5("BDTEST13" + req.body.ModeCol + req.body.ModeLiv + req.body.Langage_expediteur + req.body.Nom_expediteur + req.body.Rue_expediteur + req.body.Ville_expediteur + req.body.Code_postal_expediteur + req.body.Pays_expediteur + req.body.Telephone_expediteur + req.body.Mail_expediteur + req.body.Langage_destinataire + req.body.Nom_destinataire + req.body.Rue_destinataire + req.body.Ville_destinataire + req.body.Code_postal_destinataire + req.body.Pays_destinataire + req.body.Telephone_destinataire + req.body.Mail_destinataire + req.body.Poids + req.body.Nombre_colis + req.body.Montant_contre_remboursement + req.body.COL_Rel_Pays + req.body.COL_Rel + req.body.LIV_Rel_Pays + req.body.LIV_Rel + "PrivateK").toUpperCase();
	console.log(security);

	const body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <WSI2_CreationEtiquette xmlns="http://www.mondialrelay.fr/webservice/">
          <Enseigne>BDTEST13</Enseigne>

          <ModeCol>${req.body.ModeCol}</ModeCol>
          <ModeLiv>${req.body.ModeLiv}</ModeLiv>
          <Expe_Langage>${req.body.Langage_expediteur}</Expe_Langage>
          <Expe_Ad1>${req.body.Nom_expediteur}</Expe_Ad1>
          <Expe_Ad3>${req.body.Rue_expediteur}</Expe_Ad3>
          <Expe_Ville>${req.body.Ville_expediteur}</Expe_Ville>
          <Expe_CP>${req.body.Code_postal_expediteur}</Expe_CP>
          <Expe_Pays>${req.body.Pays_expediteur}</Expe_Pays>
          <Expe_Tel1>${req.body.Telephone_expediteur}</Expe_Tel1>
          <Expe_Mail>${req.body.Mail_expediteur}</Expe_Mail>
          <Dest_Langage>${req.body.Langage_destinataire}</Dest_Langage>
          <Dest_Ad1>${req.body.Nom_destinataire}</Dest_Ad1>
          <Dest_Ad3>${req.body.Rue_destinataire}</Dest_Ad3>
          <Dest_Ville>${req.body.Ville_destinataire}</Dest_Ville>
          <Dest_CP>${req.body.Code_postal_destinataire}</Dest_CP>
          <Dest_Pays>${req.body.Pays_destinataire}</Dest_Pays>
          <Dest_Tel1>${req.body.Telephone_destinataire}</Dest_Tel1>
          <Dest_Mail>${req.body.Mail_destinataire}</Dest_Mail>
          <Poids>${req.body.Poids}</Poids>
          <NbColis>${req.body.Nombre_colis}</NbColis>
          <CRT_Valeur>${req.body.Montant_contre_remboursement}</CRT_Valeur>
          <COL_Rel_Pays>${req.body.COL_Rel_Pays}</COL_Rel_Pays>
          <COL_Rel>${req.body.COL_Rel}</COL_Rel>
          <LIV_Rel_Pays>${req.body.LIV_Rel_Pays}</LIV_Rel_Pays>
          <LIV_Rel>${req.body.LIV_Rel}</LIV_Rel>
          <Security>${security}</Security>
        </WSI2_CreationEtiquette>
      </soap:Body>
    </soap:Envelope>`
	;

	const headers = {
		headers: {
		'content-type': 'text/xml'
		}
	};

	const requestXML = async ()=> {
		const { data } = await axios.post("http://api.mondialrelay.com/Web_Services.asmx?op=WSI2_CreationEtiquette", body, headers)
		
		xml2js.parseString(data, function (err, result) {

			const beforeFormating = (result["soap:Envelope"]["soap:Body"])[0].WSI2_CreationEtiquetteResponse[0].WSI2_CreationEtiquetteResult;
      const formatingError = (result["soap:Envelope"]["soap:Body"])[0].WSI2_CreationEtiquetteResponse[0].WSI2_CreationEtiquetteResult[0].STAT[0];

      if (beforeFormating[0].ExpeditionNum === undefined) {
        return res.status(400).send(`Bad Request !\n API status code : ${formatingError}`);

      }

            
			const tmp = {
				Numero_expedition : beforeFormating[0].ExpeditionNum[0],
                URL_Etiquette : `https://mondialrelay.com${beforeFormating[0].URL_Etiquette[0]}`
			};

			res.status(200).send(tmp);
		});
	};
	requestXML();
})

module.exports = router;