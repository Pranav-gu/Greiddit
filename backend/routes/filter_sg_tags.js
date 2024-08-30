const express = require('express');
const Subgreiddit = require("../models/Subgreiddit");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret_key_which_is_used_for#protecting$$$$$all_the_backend_1237%@93y3______routes";

router.post('/', async (req, res) => {
    const token = req.body;
    try {
        const user = jwt.verify(token.token, JWT_SECRET);
        Subgreiddit.find({}, function (err, documents) {
            if (err)
                return console.error(err);
            // console.log("documents = ", documents);
            let x = [];
            for (let i = 0; i < documents.length; i++)
                x = x.concat(documents[i].Tags);
            // console.log("x = ", x);
            res.send({ status: "ok", data: x, location: "filter_sg_tags.js" });
        });
    } catch (error) {
        res.send({ status: "error", data: "Subgreiddit Information Not Found" });
    }
})

module.exports = router;


// db.InspirationalWomen.find({first_name: { $regex: /Harriet/i} })