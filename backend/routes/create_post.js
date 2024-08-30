const express = require('express');
const Posts = require("../models/Posts");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Create a User using POST "/api/auth". Doesn't Require Auth.
router.post('/', async (req, res) => {
    let text = req.body.text;
    let postedby = req.body.postedby;
    let upvotes = req.body.upvotes;
    let downvotes = req.body.downvotes;
    let name = req.body.name;

    let obj = {
        Text: text,
        Posted_By: postedby,
        Posted_In: name,
        Upvotes: upvotes,
        Downvotes: downvotes,
        Comment: "",
        Is_Saved: false,
    }
    try {
        const post = await Posts(obj);
        post.save();
        res.send({ status: "ok" });
    } catch (error) {
        res.send({status: "error"});
    }
})



module.exports = router;