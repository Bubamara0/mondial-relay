const PORT = 8080;
// const axios = require("axios")
import axios from "axios"

document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault()
	axios.post(`http://localhost:${PORT}/creationEtiquette`, {
		params : {
			ModeCol : document.getElementsByName("ModeCol").value,
			ModeLiv : document.getElementsByName("ModeLiv").value,
			Langage_expediteur : document.getElementsByName("Langage_expediteur").value,
			Nom_expediteur : document.getElementsByName("Nom_expediteur").value,
			Rue_expediteur : document.getElementsByName("Rue_expediteur").value,
			Ville_expediteur : document.getElementsByName("Ville_expediteur").value,
			Code_postal_expediteur : document.getElementsByName("Code_postal_expediteur").value,
			Pays_expediteur : document.getElementsByName("Pays_expediteur").value,
			Telephone_expediteur : document.getElementsByName("Telephone_expediteur").value,
			Mail_expediteur : document.getElementsByName("Mail_expediteur").value,
			Langage_destinataire : document.getElementsByName("Langage_destinataire").value,
			Nom_destinataire : document.getElementsByName("Nom_destinataire").value,
			Rue_destinataire : document.getElementsByName("Rue_destinataire").value,
			Ville_destinataire : document.getElementsByName("Ville_destinataire").value,
			Code_postal_destinataire : document.getElementsByName("Code_postal_destinataire").value,
			Pays_destinataire : document.getElementsByName("Pays_destinataire").value,
			Telephone_destinataire : document.getElementsByName("Telephone_destinataire").value,
			Mail_destinataire : document.getElementsByName("Mail_destinataire").value,
			Poids : document.getElementsByName("Poids").value,
			Nombre_colis : document.getElementsByName("Nombre_colis").value,
			Montant_contre_remboursement : document.getElementsByName("Montant_contre_remboursement").value,
			COL_Rel_Pays : document.getElementsByName("COL_Rel_Pays").value,
			COL_Rel : document.getElementsByName("COL_Rel").value,
			LIV_Rel_Pays : document.getElementsByName("LIV_Rel_Pays").value,
			LIV_Rel : document.getElementsByName("LIV_Rel").value
		}
	}
	
).then(({ data }) => {
		console.log(data)
	})
	console.log(document.getElementsByName("ModeCol"));
})