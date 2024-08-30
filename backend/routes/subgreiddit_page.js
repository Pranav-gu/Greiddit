const express = require('express');
const Subgreiddit = require("../models/Subgreiddit");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret_key_which_is_used_for#protecting$$$$$all_the_backend_1237%@93y3______routes"; 

// Create a Subgreiddit using POST "/api/my_subgreiddit". Doesn't Require Auth.
router.post('/', async (req, res) => {
    const token = req.body;
    try{
        // console.log(req.body);
        const user = jwt.verify(token.token, JWT_SECRET);
        const uname = token.uname;
        const Name = token.Name;
        const Description = token.Description;
        const Banned_keywords = token.Banned_keywords.replaceAll(", ", " ");
        console.log(uname, Name, Description, Banned_keywords);
        // await Subgreiddit.findOne({ User_Name: { $eq: uname}, Name: { $eq: Name}, Description: {$eq: Description}, Banned_Keywords: {$eq: Banned_keywords}}).then((data) => {
        //     console.log("data = ", data);
        //     res.send({ status: "ok", data: data, location: "subgreiddit_page.js"});
        // })
        const sg = await Subgreiddit.findOne({ User_Name: { $eq: uname}, Name: { $eq: Name}, Description: {$eq: Description}, Banned_Keywords: {$eq: Banned_keywords}});
        console.log("sg = ", sg);
        res.send({ status: "ok", data: sg, location: "subgreiddit_page.js"});
    } catch(error){
        res.send({error: "error"});
    }
})

module.exports = router;