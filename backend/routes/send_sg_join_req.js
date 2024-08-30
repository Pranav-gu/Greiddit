const express = require('express');
const Subgreiddits_Joining_Requests = require("../models/Subgreiddits_Joining_Requests");
const ForbiddenRequests = require("../models/ForbiddenRequests");
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
        const name = token.name;
        const leave = await ForbiddenRequests.findOne({ Name: { $eq: uname }, User_Name: { $eq: name } });
        if (leave == null) {

            const oldrequest = await Subgreiddits_Joining_Requests.findOne({ Sender: { $eq: uname }, Receiver: { $eq: name } });
            // , function (err, documents) {
            //     if (err)
            //         return console.error(err);
            //     console.log("documents = ", documents);
            //     res.send({ error: "error", data: "Request Already Sent" });
            // });
            console.log("oldrequest = ", oldrequest);
            if (oldrequest == null) {
                let obj = {
                    Sender: uname,
                    Receiver: name,
                }
                const join_req = await Subgreiddits_Joining_Requests(obj);
                join_req.save();
                res.send({ status: "ok", location: "send_sg_join_req.js" });
            }
            else
                res.send({ error: "error", data: "Request Already Sent" });
        }
        else
            res.send({status: "error", data: "Can not Join this Subgreiddit"});
    } catch (error) {
        res.send({ status: "error", data: "Joining Request Could Not be Sent" });
    }
})

module.exports = router;