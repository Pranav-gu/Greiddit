const express = require('express');
const Subgreiddits_Users = require("../models/Subgreiddits_Users");
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
        // Subgreiddits_Users.find({ User_Name: {$eq: uname}}, function (err, documents) {
        //     if (err)
        //         return console.error(err);
        //     console.log("documents = ", documents);
        //     res.send({ status: "ok", data: documents, location: "leave_sg.js" });
        // });
        myquery = {User_Name: {$eq: uname}, Name: {$eq: name}};
        Subgreiddits_Users.deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
        });
        let obj = {
            Name: name,
            User_Name: uname,
        }
        let sg_leave = await ForbiddenRequests(obj);
        sg_leave.save();
        res.send({ status: "ok" })
    } catch (error) {
        res.send({ status: "error", data: "Subgreddit could not be Removed" });
    }
})

module.exports = router;