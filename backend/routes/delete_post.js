const express = require('express');
const router = express.Router();
const Posts = require("../models/Posts");
const Report = require("../models/Report");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret_key_which_is_used_for#protecting$$$$$all_the_backend_1237%@93y3______routes";

router.post('/', async (req, res) => {
    const token = req.body;
    try {
        const user = jwt.verify(token.token, JWT_SECRET);
        const uname = token.name;
        const post = token.post;
        const concern = token.concern;
        console.log("uname = ", uname, "post = ", post, "concern = ", concern);
        let myquery = { Reported_User: { $eq: uname }, Concern: { $eq: concern }, Post_associated: {$eq: post} };
        Report.deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
        });

        let myquery_post = { Text: { $eq: post }, Posted_By: { $eq: uname }};
        Posts.deleteOne(myquery_post, function (err, obj) {
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