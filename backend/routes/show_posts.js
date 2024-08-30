const express = require('express');
const Posts = require("../models/Posts");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret_key_which_is_used_for#protecting$$$$$all_the_backend_1237%@93y3______routes";

// Create a User using POST "/api/auth". Doesn't Require Auth.
router.post('/', async (req, res) => {
    const token = req.body;
    try {
        // console.log("bdebev");
        const user = jwt.verify(token.token, JWT_SECRET);
        console.log("bdebev");
        const name = token.name;
        console.log("name = ", name);
        Posts.find({ Posted_In: { $eq: name } }, function (err, documents) {
            if (err)
                return console.error(err);
            console.log("documents = ", documents);
            res.send({ status: "ok", data: documents, location: "show_posts.js" });
        });
    } catch (error) {
        res.send({ status: "error", data: "Posts Not Found" });
    }
})



module.exports = router;