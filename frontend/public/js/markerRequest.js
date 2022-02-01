const PORT = 8080;
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
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
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

    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-2.05492, 48.6315], // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    // Add markers to the map.
    for (const marker of geojson.features) {
      // Create a DOM element for each marker.
      const el = document.createElement("div");
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = "marker";
      el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = "100%";

      el.addEventListener("click", () => {
        window.alert(marker.properties.message);
      });

      // Add markers to the map.
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
    }

    const marker = new mapboxgl.Marker()
      .setLngLat([-2.05492, 48.6315])
      .addTo(map);
  } catch (err) {
    console.log(err.message);
  }
});
