const express = require('express');
const router = express.Router();
const Following = require("../models/Following");
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret_key_which_is_used_for#protecting$$$$$all_the_backend_1237%@93y3______routes";

router.post('/', async (req, res) => {
    const token = req.body;
    try {
        const user = jwt.verify(token.token, JWT_SECRET);
        // console.log("user = ", user);
        const uname = user.uname;
        Following.find({ User_Name_user: { $eq: uname } }, function (err, documents) {
            if (err) return console.error(err);
            console.log(documents);
            res.send({ status: "ok", data: documents, location: "follower.js"})
        });
    } catch (error) {
        console.log(error);
        res.send({ error: "error" });
    }
})

module.exports = router;