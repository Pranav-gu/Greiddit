const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret_key_which_is_used_for#protecting$$$$$all_the_backend_1237%@93y3______routes";

router.post('/', async (req, res) => {
    const token = req.body;
    try {
        const user = jwt.verify(token.token, JWT_SECRET);
        const uname = token.uname;
        User.find({User_Name: {$ne: uname}}, function (err, documents) {
            if (err)
                return console.error(err);
            res.send({ status: "ok", data: documents, location: "db_users.js" });
        });
    } catch (error) {
        res.send({ status: "error" });
    }
})

module.exports = router;