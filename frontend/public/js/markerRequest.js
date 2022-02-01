const PORT = 3000;
import axios from "axios";
import {
	object
} from "joi";
document.querySelector("form").addEventListener("submit", async (e) => {
	e.preventDefault();
	document.querySelector("#loading").style.display = "flex";
	document.querySelector("#map").style.display = "none";

	try {
		const { data } = await axios.post(`http://localhost:${PORT}/prsearch/villeCP`, {
				Pays: document.getElementsByName("Pays")[0].value,
				Ville: document.getElementsByName("Ville")[0].value,
				CP: document.getElementsByName("CP")[0].value,
				NombreResultats: document.getElementsByName("NombreResultats")[0].value,
			}
		);

		mapboxgl.accessToken = "pk.eyJ1IjoicmljaGFyZGRhc3NhdXQiLCJhIjoiY2t6MmZrMHpvMGkxYTJvbXY1c3psYjhmYSJ9.f3SH9sWBhFpEg7hCo9VeNA";

		const capitalize = (v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();

		data.forEach(pr => {
			const marker = new mapboxgl.Marker().setLngLat([
				parseFloat(pr.Coordonnees.Longitude.trim().replace(",", ".")),
				parseFloat(pr.Coordonnees.Latitude.trim().replace(",", "."))
			]).addTo(map);

			marker._element.addEventListener("click", (e)=> {
				document.querySelector(".pr-name").innerText = pr.Adresse.split(",")[0];
				document.querySelector(".pr-address").innerText = pr.Adresse.split(",")[1];

				// Tri des horaires
				let schedules = {
					Lundi : "",
					Mardi : "",
					Mercredi : "",
					Jeudi : "",
					Vendredi : "",
					Samedi : "",
					Dimanche : ""
				};
				Object.keys(pr.Horaires).forEach((jour, i) => {
					jour.split("_").forEach(day => {
						schedules[day] = pr.Horaires[jour];
						console.log(schedules[day]);
					});
				});
				Object.keys(schedules).forEach((jour, i) => {
					document.querySelectorAll(".pr-schedule")[i].innerHTML = `<p>${schedules[jour]}</p>`;
				})
				const getCurrentSchedules = (today = new Date().getDay()) => {
					let tmp = "";
					// Récupération des horaires actuelles
					switch (today) {
						case 0:
							tmp = schedules["Dimanche"];
							break;
						case 1:
							tmp = schedules["Lundi"];
							break;
						case 2:
							tmp = schedules["Mardi"];
							break;
						case 3:
							tmp = schedules["Mercredi"];
							break;
						case 4:
							tmp = schedules["Jeudi"];
							break;
						case 5:
							tmp = schedules["Vendredi"];
							break;
						case 6:
							tmp = schedules["Samedi"];
							break;
						default :
							tmp = "Fermé";
					};
					if (tmp === "Fermé") return tmp;
					else {
						const t = tmp.split("-").map(horaire => horaire.trim().split("h"));
						return {
							openHour : parseInt(t[0][0]),
							openMinute : parseInt(t[0][1]),
							closeHour : parseInt(t[1][0]),
							closeMinute : parseInt(t[1][1]),
						};
					};
				};
				
				const showCurrentSchedule = () => {
					const tmp = getCurrentSchedules();

					// Comparing actual time to schedules
					if (new Date().getHours() >= tmp.openHour && new Date().getHours() <= tmp.closeHour) {
						if (new Date().getMinutes() >= tmp.openMinute && new Date().getMinutes() <= tmp.closeMinute) {
							document.querySelector(".pr-current-schedule").innerText = "Actuellement ouvert !";
							document.querySelector(".pr-current-schedule").style.setProperty("color", "lime");
						} else {
							document.querySelector(".pr-current-schedule").innerText = "Actuellement fermé !";
							document.querySelector(".pr-current-schedule").style.setProperty("color", "red");
						}
					} else {
						document.querySelector(".pr-current-schedule").innerText = "Actuellement fermé !";
						document.querySelector(".pr-current-schedule").style.setProperty("color", "red");
					}
				}
				showCurrentSchedule();
				showMapOverlay();
			});
		});
	} catch (err) {
		console.log(err.message);
	}
});

const showMapOverlay = () => {
	document.querySelector(".map-overlay").style.setProperty("display", "flex");
}

const hideMapOverlay = () => {
	document.querySelector(".map-overlay").style.setProperty("display", "none");
};

document.querySelector(".map-overlay-closer").addEventListener("click", (e) => {
	e.preventDefault();
	hideMapOverlay();
});