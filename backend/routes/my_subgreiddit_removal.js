const express = require('express');
const Subgreiddit = require("../models/Subgreiddit");
const Posts = require("../models/Posts");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret_key_which_is_used_for#protecting$$$$$all_the_backend_1237%@93y3______routes"; 

// Create a Subgreiddit using POST "/api/my_subgreiddit". Doesn't Require Auth.
router.post('/', async (req, res) => {
    const token = req.body;
    try{
        // console.log(req.body);
        const user = jwt.verify(token.token, JWT_SECRET);
        const uname = token.uname;
        const name = token.Name;
        const desc = token.Description;
        const ban = token.Banned_keywords.replaceAll(", ", " ");
        console.log("Control_______reaches _***** here");
        Subgreiddit.find({ User_Name: { $eq: uname }, Name: name, Description: desc, Banned_Keywords: ban }, function (err, documents) {
            if (err)
            {
                res.send({ status: "error", data: "Subgreiddit Does not Exist"})
            }
            console.log(documents);
        })
        let myquery = { User_Name: { $eq: uname }, Name: { $eq: name }, Description: {$eq: desc}, Banned_Keywords: {$eq: ban} };
        Subgreiddit.deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
        });

        let postquery = { Posted_By: {$eq: name}};
        Posts.deleteMany(postquery, function (err, obj) {
            if (err) throw err;
            console.log("Posts deleted.");
        });

        res.send({ status: "ok", location: "my_subgreiddit_removal.js"});
    } catch(error){
        res.send({ status: "error" });
    }
})

module.exports = router;