mapboxgl.accessToken = 'pk.eyJ1IjoicmljaGFyZGRhc3NhdXQiLCJhIjoiY2t6MmZrMHpvMGkxYTJvbXY1c3psYjhmYSJ9.f3SH9sWBhFpEg7hCo9VeNA';
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v11', // style URL
	center: [-2.05492, 48.6315], // starting position [lng, lat]
	zoom: 10 // starting zoom
});

const marker = new mapboxgl.Marker().setLngLat([-2.05492, 48.6315]).addTo(map);