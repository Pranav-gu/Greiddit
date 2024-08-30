const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret_key_which_is_used_for#protecting$$$$$all_the_backend_1237%@93y3______routes";

router.post('/', async(req, res) => {
    const token = req.body;
    try{
        const user = jwt.verify(token.token, JWT_SECRET);
        const user_id = user.userId;
        // console.log("user = ", user, "user_id = ", user.userId);
        // const user = await User.findOne({ User_Name: { $eq: uname }});
        await User.findOne({ _id: { $eq: user_id }}).then((data) => {
            // console.log("user found", user)
            res.send({status: "ok", data: data, location: "profile.js"})
        })
        .catch((error) => {
            res.send({ status: "error", data: error})
        });
        // res.json({status: "error", error: "Invalid Password"});
    } catch(error){
        res.send({error: "error"});
    }
})

module.exports = router;