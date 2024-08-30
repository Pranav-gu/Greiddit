const express = require('express');
const Subgreiddits_Users = require("../models/Subgreiddits_Users");
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
        Subgreiddits_Users.find({ User_Name: {$eq: uname}}, function (err, documents) {
            if (err)
                return console.error(err);
            console.log("documents = ", documents);
            res.send({ status: "ok", data: documents, location: "show_joined_sg.js" });
        });
    } catch (error) {
        res.send({ status: "error", data: "Subgreiddit Information Not Found" });
    }
})

module.exports = router;