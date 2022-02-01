const PORT = 8080;
import axios from "axios"
import { object } from "joi";

document.querySelector("form").addEventListener("submit", async (e) => {

	e.preventDefault()
    try {
	await axios.post(`http://localhost:${PORT}/creationEtiquette`, {
		ModeCol : document.getElementsByName("ModeCol")[0].value,
        ModeLiv : document.getElementsByName("ModeLiv")[0].value,
        Langage_expediteur : document.getElementsByName("Langage_expediteur")[0].value,
        Nom_expediteur : document.getElementsByName("Nom_expediteur")[0].value,
        Rue_expediteur : document.getElementsByName("Rue_expediteur")[0].value,
        Ville_expediteur : document.getElementsByName("Ville_expediteur")[0].value,
        Code_postal_expediteur : document.getElementsByName("Code_postal_expediteur")[0].value,
        Pays_expediteur : document.getElementsByName("Pays_expediteur")[0].value,
        Telephone_expediteur : document.getElementsByName("Telephone_expediteur")[0].value,
        Mail_expediteur : document.getElementsByName("Mail_expediteur")[0].value,
        Langage_destinataire : document.getElementsByName("Langage_destinataire")[0].value,
        Nom_destinataire : document.getElementsByName("Nom_destinataire")[0].value,
        Rue_destinataire : document.getElementsByName("Rue_destinataire")[0].value,
        Ville_destinataire : document.getElementsByName("Ville_destinataire")[0].value,
        Code_postal_destinataire : document.getElementsByName("Code_postal_destinataire")[0].value,
        Pays_destinataire : document.getElementsByName("Pays_destinataire")[0].value,
        Telephone_destinataire : document.getElementsByName("Telephone_destinataire")[0].value,
        Mail_destinataire : document.getElementsByName("Mail_destinataire")[0].value,
        Poids : document.getElementsByName("Poids")[0].value,
        Nombre_colis : document.getElementsByName("Nombre_colis")[0].value,
        Montant_contre_remboursement : document.getElementsByName("Montant_contre_remboursement")[0].value,
        COL_Rel_Pays : document.getElementsByName("COL_Rel_Pays")[0].value,
        COL_Rel : document.getElementsByName("COL_Rel")[0].value,
        LIV_Rel_Pays : document.getElementsByName("LIV_Rel_Pays")[0].value,
        LIV_Rel : document.getElementsByName("LIV_Rel")[0].value
	}).then(({ data }) => {
        window.location.href = data
    })
	
 }catch(err) {
     if(err) {
        console.log(err.message)
     }
 }

})
