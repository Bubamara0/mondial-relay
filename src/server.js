const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// ---------------------------------------------------------------------------
// Faites "npm i" pour installer tous les modules utilisés dans l'application
// ---------------------------------------------------------------------------

app.get("/", (req, res) => {
	res.send("Our dear homepage");
});

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});