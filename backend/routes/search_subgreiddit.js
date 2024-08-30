const express = require('express');
const Subgreiddit = require("../models/Subgreiddit");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret_key_which_is_used_for#protecting$$$$$all_the_backend_1237%@93y3______routes";
const FuzzySearch = require('fuzzy-search');

router.post('/', async (req, res) => {
    const token = req.body;
    try {
        const user = jwt.verify(token.token, JWT_SECRET);
        const str = token.str;
        if (token.selected_tags == null) {
            // Subgreiddit.find({ Name: { "$regex": str, "$options": "i" } }, function (err, documents) {
            //     if (err)
            //         return console.error(err);
            //     console.log("documents = ", documents);
            //     res.send({ status: "ok", data: documents, location: "search_subgreiddit.js" });
            // });
            let x = [];
            Subgreiddit.find({}, function (err, documents) {
                if (err)
                    return console.error(err);
                x = x.concat(documents);
                // console.log("x = ", x);
                const searcher = new FuzzySearch(x, ['Name', 'Description', 'Tags', 'Banned_Keywords'], {
                    caseSensitive: false,
                });
                const result = searcher.search(str);
                // console.log("result = ", result);
                res.send({ status: "ok", data: result, location: "search_subgreiddit.js" });
            });
            // res.send({ status: "ok", data: docsuments, location: "search_subgreiddit.js" });
        }
        else {
            const selected_tags = token.selected_tags;
            console.log("selected_tags_len = ", selected_tags.length);
            Subgreiddit.find({ Tags: { $in: selected_tags } }, function (err, documents) {
                if (err)
                    return console.error(err);
                console.log("documents = ", documents);
                res.send({ status: "ok", data: documents, location: "search_subgreiddit.js" });
            });
        }
    } catch (error) {
        res.send({ status: "error", data: "Subgreiddit Information Not Found" });
    }
})

module.exports = router;