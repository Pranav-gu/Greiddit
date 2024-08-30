const express = require('express');
const Subgreiddits_Joining_Requests = require("../models/Subgreiddits_Joining_Requests");
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
        const flag = token.flag;
        const receiver = token.receiver;
        const sender = token.sender;
        console.log("receiver = ", receiver, "sender = ", sender);
        if (flag)               // Accept the Request and Add sender to Subgreiddits Users Schema
        {
            let obj = {
                User_Name: receiver,
                Name: sender,
                Is_Blocked: false, 
            }
            const sg_user_add = await Subgreiddits_Users(obj);
            sg_user_add.save();
        }
        // Remove the Request
        let myquery = { Sender: { $eq: sender }, Receiver: { $eq: receiver } };
        Subgreiddits_Joining_Requests.deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
        });
        res.send({status: "ok", location: "sg_respond_req.js"});
    } catch (error) {
        res.send({ status: "error", data: "Joining Requests Not Found" });
    }
})

module.exports = router;