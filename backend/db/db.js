const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
let Schema = mongoose.Schema;

let postSchema = new Schema(
    {

    }
);

let Post = mongoose.model("post", postSchema);

router.post("/", async (req, res) => {
    try {
        let post = new Post(req.body);
        post = await post.save();
        res.status(200).json({
            status: 200,
            data: post,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

module.exports = db;