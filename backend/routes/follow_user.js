const express = require('express');
const router = express.Router();
const Follower = require("../models/Follower");
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
        const name = token.name;
        const postedby = token.postedby;
        let oldfollowing = await Follower.findOne({User_Name_user: {$eq: postedby}, User_Name_follower: {$eq: name} });
        console.log("oldfollowing = ", oldfollowing);
        if (oldfollowing == null)
        {
            let obj = {
                User_Name_user: postedby,
                User_Name_follower: name,
            }
            console.log("obj = ", obj);
            let follow = await Follower(obj);
            follow.save();
            console.log("followers Schema updated");
            let obj1 = {
                User_Name_user: name,
                User_Name_following: postedby,
            }
            console.log("obj1 = ", obj1);
            let following = await Following(obj1);
            following.save();
            console.log("following Schema updated");
            res.send({status: "ok"});
        }
        else
        {
            res.send({status: "error"})
        }
    } catch (error) {
        console.log(error);
        res.send({ error: "error" });
    }
})

module.exports = router;