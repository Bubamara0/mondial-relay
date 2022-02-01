const PORT = process.env.PORT || 8080;
import axios from "axios";
import { object } from "joi";

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post(
      `http://localhost:${PORT}/prsearch/villeCP`,
      {
        Pays: document.getElementsByName("Pays")[0].value,
        Ville: document.getElementsByName("Ville")[0].value,
        CP: document.getElementsByName("CP")[0].value,
        NombreResultats: document.getElementsByName("NombreResultats")[0].value,
      }
    );
    console.log(data);

    mapboxgl.accessToken =
      "pk.eyJ1IjoicmljaGFyZGRhc3NhdXQiLCJhIjoiY2t6MmZrMHpvMGkxYTJvbXY1c3psYjhmYSJ9.f3SH9sWBhFpEg7hCo9VeNA";

      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-2.05492, 48.6315], // starting position [lng, lat]
        zoom: 10, // starting zoom
      });

      data.forEach(e => {
        const marker = new mapboxgl.Marker()
        .setLngLat([parseFloat(e.Coordonnees.Longitude.trim().replace(",", ".")), parseFloat(e.Coordonnees.Latitude.trim().replace(",", "."))])
        .addTo(map);
      });

  } catch (err) {
    console.log(err.message);
  }
});
