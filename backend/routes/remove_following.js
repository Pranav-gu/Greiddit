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
        const uname = token.uname;
        const following = token.following;
        // console.log("uname = ", uname, "following = ", following);
        let myquery = { User_Name_user: { $eq: uname }, User_Name_following: { $eq: following } };
        Following.deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
        });
        res.send({ status: "ok"})
    } catch (error) {
        console.log(error);
        res.send({ error: "error" });
    }
})

module.exports = router;