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
        const user = jwt.verify(token.token, JWT_SECRET);
        const uname = token.uname;
        const id = token.id;
        Posts.find({ Posted_In: { $eq: uname } }, function (err, documents) {
            if (err)
                return console.error(err);
            console.log("documents = ", documents);
            res.send({ status: "ok", data: documents, location: "my_subgreiddit_post.js" });
        });
    } catch (error) {
        res.send({ status: "error", data: "Post Not Found" });
    }
})



module.exports = router;