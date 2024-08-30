const express = require('express');
const Subgreiddits_Users = require("../models/Subgreiddits_Users");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret_key_which_is_used_for#protecting$$$$$all_the_backend_1237%@93y3______routes"; 

// Create a Subgreiddit using POST "/api/my_subgreiddit". Doesn't Require Auth.
router.post('/', async (req, res) => {
    const token = req.body;
    try{
        const user = jwt.verify(token.token, JWT_SECRET);
        const uname = token.name;
        // Report.find({ Reported_User: { $eq: uname } }, function (err, documents) {
        //     if (err)
        //         return console.error(err);
        //     console.log(documents);
        //     res.send({ status: "ok", data: documents, location: "block_user.js"});
        // });
        console.log("uname = ", uname);
        let myquery = { Name: uname };
        let newvalues = { $set: {Is_Blocked: true} };
        Subgreiddits_Users.updateMany(myquery, newvalues, function (err) {
            if (err) throw err;
            console.log("Multiple documents updated");
        });
        res.send({status: "ok"});
    } catch(error){
        res.send({ status: "error", data: "Subgreiddit Could Not be Blocked."});
    }
})

module.exports = router;