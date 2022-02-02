/* ---------------------------------------------------------------
# MODULE IMPORTS
--------------------------------------------------------------- */
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { response, Router } = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256");

/* ---------------------------------------------------------------
# EXTERNAL SCRIPTS IMPORTS
--------------------------------------------------------------- */

const cpRequest = require("./cpRequest");
const villeRequest = require("./villeRequest");
const villeCpRequest = require("./villeCpRequest");
const coordonneesRequest = require("./coordonnesRequest");
const creationEtiquette = require("./creationEtiquette");
const villeCpRequestWeb = require("./villeCpRequestWeb");

const dbConnect = require("../database/dbConnect");

/* ---------------------------------------------------------------
# SERVER SETTINGS
--------------------------------------------------------------- */
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('combined'));
app.use(cors());

/* ---------------------------------------------------------------
# ROUTES SETTINGS
--------------------------------------------------------------- */
app.use("/prsearch", cpRequest, villeRequest, villeCpRequest, coordonneesRequest, villeCpRequestWeb);
app.use("/creationEtiquette", creationEtiquette);

/* ---------------------------------------------------------------
# SERVER LAUNCHING
--------------------------------------------------------------- */
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log(`Back-end server started on http://localhost:${PORT}`));

/* ---------------------------------------------------------------
# DATABASE LAUNCHING
--------------------------------------------------------------- */
dbConnect;

const portDB = 8080;
app.listen(portDB, ()=> console.log(`Database started on port : ${portDB}`));

const user = require("../models/userModel");

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403).send("Forbidden")
    
    }
}

app.post("/api/newUser", async (req,res) => {
    const newUser = new user(req.body)
    try {
        await newUser.save();
        res.send(newUser);
    } catch (err) {
        res.send(err.message);
    }
})

app.post("/api/login", (req,res) => {

    const user = {
        username : req.body.username,
        password : req.body.password
    }

    jwt.sign({user}, 'secretKey', (err, token) => {
        res.send(`Security token : ${token}`)
    })
})

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message : "Post created...",
                authData
            });
        }
    })
});

app.post("/api/findUser", (req, res) => {

        user.find({
            username: req.body.username,
            password: req.body.password
        });


        if(user) {
            res.status(200).send(`Found user ! \n ${user}`);
        } else {
            res.status(404).send("User not found");
        }
   
})