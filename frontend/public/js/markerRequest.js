const PORT = 3000;
import axios from "axios";
import {object} from "joi";

const currentScheduleTag = document.querySelector(".pr-current-schedule");

document.querySelector("form").addEventListener("submit", async (e) => {
	e.preventDefault();
	document.querySelector("#loading").style.display = "flex";
	document.querySelector("#map").style.display = "none";

	if (parseInt(document.getElementsByName("NombreResultats")[0].value) > 30) {
		document.getElementsByName("NombreResultats")[0].value = 30;
	};

	try {
		const { data } = await axios.post(`http://localhost:${PORT}/prsearch/villeCP`, {
				Pays: document.getElementsByName("Pays")[0].value,
				Ville: document.getElementsByName("Ville")[0].value,
				CP: document.getElementsByName("CP")[0].value,
				NombreResultats: document.getElementsByName("NombreResultats")[0].value,
			}
		);

		mapboxgl.accessToken = "pk.eyJ1IjoicmljaGFyZGRhc3NhdXQiLCJhIjoiY2t6MmZrMHpvMGkxYTJvbXY1c3psYjhmYSJ9.f3SH9sWBhFpEg7hCo9VeNA";
		document.querySelector("#map").style.display = "flex";
		const map = new mapboxgl.Map({
			container: "map", // container ID
			style: "mapbox://styles/mapbox/streets-v11", // style URL
			center: [-2.05492, 48.6315], // starting position [lng, lat]
			zoom: 10, // starting zoom
		});
		map.dragRotate.disable();
		map.touchZoomRotate.disableRotation();

		// Add markers to the map.
		data.forEach(pr => {
			const marker = new mapboxgl.Marker().setLngLat([
				parseFloat(pr.Coordonnees.Longitude.trim().replace(",", ".")),
				parseFloat(pr.Coordonnees.Latitude.trim().replace(",", "."))
			]).addTo(map);

			marker._element.addEventListener("click", (e)=> {
				document.querySelector(".pr-name").innerText = pr.Adresse.split(",")[0];
				document.querySelector(".pr-address").innerText = pr.Adresse.split(",")[1];
				document.querySelector(".pr-distance").innerText = pr.Distance;

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
					});
				});
				Object.keys(schedules).forEach((jour, i) => {
					document.querySelectorAll(".pr-schedule")[i].innerHTML = `<p>${schedules[jour]}</p>`;
				});
				const getCurrentSchedule = (dayId = new Date().getDay()) => {
					let dayName = "";
					// R??cup??ration des horaires actuelles
					switch (dayId) {
						case 0:
							dayName = schedules["Dimanche"];
							break;
						case 1:
							dayName = schedules["Lundi"];
							break;
						case 2:
							dayName = schedules["Mardi"];
							break;
						case 3:
							dayName = schedules["Mercredi"];
							break;
						case 4:
							dayName = schedules["Jeudi"];
							break;
						case 5:
							dayName = schedules["Vendredi"];
							break;
						case 6:
							dayName = schedules["Samedi"];
							break;
						default :
							dayName = "Ferm??";
					};
					if (dayName === "Ferm??") return dayName;
					else {
						const tmp = dayName.split("-").map(horaire => horaire.trim().split("h"));
						return {
							openHour : parseInt(tmp[0][0]),
							openMinute : parseInt(tmp[0][1]),
							closeHour : parseInt(tmp[1][0]),
							closeMinute : parseInt(tmp[1][1]),
						};
					};
				};
				
				const showCurrentSchedule = () => {
					// Comparing actual time to schedules
					const schedule = getCurrentSchedule();
					if (schedule === "Ferm??") {
						setCurrentScheduleTag("Actuellement ferm??", "red");
						return;
					} else {
						// Get minutes remaining before pr closes
						const minsBeforeClosure = (_openDate, _now, _closeDate) => {
							try {
								// Formating dates
								if (_openDate > _now && _closeDate < _now) {
									_openDate.setDate(_openDate.getDate() - 1);
								} else if (_closeDate.getHours() < _openDate.getHours()) {
									_closeDate.setDate(_closeDate.getDate() + 1);
								};
								
								return Math.floor((_closeDate - _now) / 1000 / 60);
							} catch (err) {
								console.log(err.message);
							};
						};

						const now = new Date();
						const openDate = new Date();
						openDate.setHours(schedule.openHour);
						openDate.setMinutes(schedule.openMinute);
						openDate.setSeconds(0);
						openDate.setMilliseconds(0);

						const closeDate = new Date();
						closeDate.setHours(schedule.closeHour);
						closeDate.setMinutes(schedule.closeMinute);
						closeDate.setSeconds(0);
						closeDate.setMilliseconds(0);

						if (minsBeforeClosure(openDate, now, closeDate) > 0) {
							if (minsBeforeClosure(openDate, now, closeDate) > 0 && minsBeforeClosure(openDate, now, closeDate) < 60){
								setCurrentScheduleTag(`Ferme dans ${minsBeforeClosure(openDate, now, closeDate)} minutes !`, "orange");
							} else {
								setCurrentScheduleTag("Actuellement ouvert", "lime");
							};
						} else {
							setCurrentScheduleTag("Actuellement ferm??", "red");
						};
					};
				};
				showCurrentSchedule();
				showMapOverlay();
			});
		});
	} catch (err) {
		console.log(err.message);
	};
	document.querySelector("#loading").style.setProperty("display", "none");

});

const capitalize = (v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
const showMapOverlay = () => document.querySelector(".map-overlay").style.setProperty("display", "flex");
const hideMapOverlay = () => document.querySelector(".map-overlay").style.setProperty("display", "none");

const setCurrentScheduleTag = (text, color) => {
	currentScheduleTag.innerText = text;
	currentScheduleTag.style.setProperty("color", color);
}

document.querySelector(".map-overlay-closer").addEventListener("click", (e) => {
	e.preventDefault();
	hideMapOverlay();
});

// Totalement inutile
import boxImg from "../img/box.png";
import box2Img from "../img/box2.png";
const box = document.querySelector(".pr-photo");

box.setAttribute("src", boxImg)
box.style.setProperty("cursor", "pointer");

box.addEventListener("click", () => {
	if (box.getAttribute("src") === boxImg) {
		box.setAttribute("src", box2Img);
	} else box.setAttribute("src", boxImg);
});