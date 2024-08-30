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
        console.log("hello there looking for upvotes_downvotes.s?");
        const user = jwt.verify(token.token, JWT_SECRET);
        const name = token.name;
        const id = token.id;
        const flag = token.flag;
        const text = parseInt(token.text);
        console.log("name = ", name, "id = ", id, "flag = ", flag, "text = ", text);
        let myquery = { _id: id, Posted_In: name };
        let newvalues = {};
        if (flag)
            newvalues = { $set: {Downvotes: text+1} };
        else
            newvalues = { $set: {Upvotes: text+1}};
        Posts.updateOne(myquery, newvalues, function (err) {
            if (err) throw err;
            console.log("1 document updated");
        });
        res.send({status: "ok"});
    } catch (error) {
        res.send({ status: "error", data: "Posts Not Found" });
    }
})



module.exports = router;