const PORT = 3000;
import axios from "axios";
import {object} from "joi";

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
		// console.log(data);

		mapboxgl.accessToken = "pk.eyJ1IjoicmljaGFyZGRhc3NhdXQiLCJhIjoiY2t6MmZrMHpvMGkxYTJvbXY1c3psYjhmYSJ9.f3SH9sWBhFpEg7hCo9VeNA";
		const geojson = {
			type: "FeatureCollection",
			features: [{
					type: "Feature",
					properties: {
						message: "Foo",
						iconSize: [60, 60],
					},
					geometry: {
						type: "Point",
						coordinates: [-66.324462, -16.024695],
					},
				},
				{
					type: "Feature",
					properties: {
						message: "Bar",
						iconSize: [50, 50],
					},
					geometry: {
						type: "Point",
						coordinates: [-61.21582, -15.971891],
					},
				},
				{
					type: "Feature",
					properties: {
						message: "Baz",
						iconSize: [40, 40],
					},
					geometry: {
						type: "Point",
						coordinates: [-63.292236, -18.281518],
					},
				},
			],
		};

		document.querySelector("#loading").style.setProperty("display", "none");
		document.querySelector("#map").style.display = "flex";
		const map = new mapboxgl.Map({
			container: "map", // container ID
			style: "mapbox://styles/mapbox/streets-v11", // style URL
			center: [-2.05492, 48.6315], // starting position [lng, lat]
			zoom: 10, // starting zoom
		});
		map.dragRotate.disable();
		map.touchZoomRotate.disableRotation();

		console.clear();

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
						// console.log(schedules[day]);
					});
				});
				Object.keys(schedules).forEach((jour, i) => {
					document.querySelectorAll(".pr-schedule")[i].innerHTML = `<p>${schedules[jour]}</p>`;
				});
				const getCurrentSchedule = (dayId = new Date().getDay()) => {
					let tmp = "";
					// Récupération des horaires actuelles
					switch (dayId) {
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
					const time = getCurrentSchedule();
					console.log(time);

					const scheduleOpened = e => {
						e.innerText = "Actuellement ouvert";
						e.style.setProperty("color", "lime");
					};
					const scheduleClosed = e => {
						e.innerText = "Actuellement fermé";
						e.style.setProperty("color", "red");
					}

					console.log(getCurrentSchedule());

					// Comparing actual time to schedules
					const currentScheduleTag = document.querySelector(".pr-current-schedule");
					const h = new Date().getHours();
					const m = new Date().getMinutes();
					const isBetweenHours = h >= time.openHour && h <= (time.closeHour <= time.openHour ?
						(time.closeHour + time.openHour)
						:
						time.closeHour
					);
					const isBetweenMinutes = m >= time.openMinute && m <= (time.closeMinute <= time.openMinute ?
						(time.closeMinute + time.openMinute)
						:
						time.closeMinute
					);
					console.log(time.closeMinute <= time.openMinute ?
						(time.closeMinute + time.openMinute) === 0 ?
							60
							:
							(time.closeMinute + time.openMinute)
						:
						time.closeMinute
					);
					// console.log(isBetweenHours);
					console.log(new Date().getMinutes(), "est supérieur à", time.openMinute, ":", new Date().getMinutes() >= time.openMinute);
					console.log(new Date().getMinutes(), "est inférieur à", (time.closeMinute <= time.openMinute ?
						(time.closeMinute + time.openMinute)
						:
						time.closeMinute
					), ":", isBetweenMinutes);
					// console.log(isBetweenMinutes);
					if (isBetweenHours) {
						if (isBetweenMinutes){
							scheduleOpened(currentScheduleTag);
						} else {
							scheduleClosed(currentScheduleTag);
						}
					} else {
						scheduleClosed(currentScheduleTag);
					}
				};
				showCurrentSchedule();
				showMapOverlay();
			});
		});
	} catch (err) {
		console.log(err.message);
	};
});

const capitalize = (v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
const showMapOverlay = () => document.querySelector(".map-overlay").style.setProperty("display", "flex");
const hideMapOverlay = () => document.querySelector(".map-overlay").style.setProperty("display", "none");

document.querySelector(".map-overlay-closer").addEventListener("click", (e) => {
	e.preventDefault();
	hideMapOverlay();
});

import boxImg from "../img/box.png";
import box2Img from "../img/box2.png";
const box = document.querySelector(".pr-photo");

box.setAttribute("src", boxImg)
box.style.setProperty("cursor", "pointer");

box.addEventListener("click", () => {
	if (box.getAttribute("src") === boxImg) box.setAttribute("src", box2Img);
	else box.setAttribute("src", boxImg);
});