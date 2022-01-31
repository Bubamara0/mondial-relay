const PORT = 8080;
import axios from "axios"
import { object } from "joi";

document.querySelector("form").addEventListener("submit", async (e) => {
	e.preventDefault();
	try {
		const { data } = await axios.post(`http://localhost:${PORT}/prsearch/villeCP`, {
			Pays : document.getElementsByName("Pays")[0].value,
			Ville : document.getElementsByName("Ville")[0].value,
			CP : document.getElementsByName("CP")[0].value,
			NombreResultats : document.getElementsByTagName("NombreResultats")[0].value
		});
		console.log(data);
	} catch(err) {
		console.log(err.message);
	};
});