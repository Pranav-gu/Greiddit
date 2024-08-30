const express = require('express');
const Subgreiddit = require("../models/Subgreiddit");
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
        console.log(user);
        const uname = token.uname;
        // const sg_existing = await Subgreiddit.findOne({ User_Name: { $eq: uname}});
        // console.log("sg_existing = ", sg_existing);
        // if (sg_existing == null)
        // {
            // console.log(uname, Name, Description, Tags, Banned_keywords);
            // let obj = {
                // Name: Name,
                // Description: Description,
                // Tags: Tags,
                // Banned_Keywords: Banned_keywords,
                // User_Name: uname,
            // }
            // const sg = await Subgreiddit(obj);
            // sg.save();
            // res.send({ status: "ok" });
        // }
        Subgreiddit.find({ User_Name: { $eq: uname } }, function (err, documents) {
            if (err)
                return console.error(err);
            console.log(documents);
            res.send({ status: "ok", data: documents, location: "my_subgreiddit_list.js"});
        });
    } catch(error){
        res.send({ status: "error", data: "Subgreiddit Information Not Found"});
    }
})

module.exports = router;