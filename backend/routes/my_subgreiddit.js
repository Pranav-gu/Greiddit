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
        const Tags = token.Tags;
        const Banned_keywords = token.Banned_keywords.replaceAll(", ", " ");
        const sg_existing = await Subgreiddit.findOne({ User_Name: { $eq: uname}, Name: { $eq: Name}});
        console.log("sg_existing = ", sg_existing);
        if (sg_existing == null)
        {
            console.log(uname, Name, Description, Tags, Banned_keywords);
            let obj = {
                Name: Name,
                Description: Description,
                Tags: Tags,
                Banned_Keywords: Banned_keywords,
                User_Name: uname,
            }
            const sg = await Subgreiddit(obj);
            sg.save();
            res.send({ status: "ok" });
        }
        else
        {
            res.send({ status: "error", data: "User Exists"});
        }
    } catch(error){
        res.send({error: "error"});
    }
})

module.exports = router;