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
        const user = jwt.verify(token.token, JWT_SECRET);
        const uname = token.uname;
        const id = token.id;
        console.log("name = ", uname);
        let myquery = { Posted_By: uname, _id: id };
        console.log("myquery = ", myquery);
        let newvalues = { $set: {Is_Saved: false } };
        console.log("newvalues = ", newvalues);
        Posts.updateOne(myquery, newvalues, function (err) {
            if (err) throw err;
            // console.log("documents = ", documents);
            console.log("1 document updated");
        });


        // let myquery = { _id: user_id };
        // let newvalues = { $set: {First_Name: fname, Last_Name: lname, User_Name: uname, Age: age, Password: encryptedPassword, Contact_number: contact } };
        // User.updateOne(myquery, newvalues, function (err) {
            // if (err) throw err;
            // console.log("1 document updated");
            // db.close();
        // });

        res.send({status: "ok"});
    } catch (error) {
        res.send({ status: "error", data: "Post Not Found" });
    }
})



module.exports = router;