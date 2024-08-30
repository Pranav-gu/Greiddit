const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Create a User using POST "/api/auth". Doesn't Require Auth.
router.post('/', async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    console.log(req.body);
    let fname = req.body.fname;
    let lname = req.body.lname;
    let uname = req.body.uname;
    let age = req.body.age;
    let contact = req.body.contact;
    let email = req.body.email;
    let password = req.body.password;

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword);
    if (!body("email", "Enter a Valid Email").isEmail())
        return res.status(400).json({ errors: errors.array() });
    const oldUser = await User.findOne({ Email: { $eq: email } });
    console.log(oldUser);
    if (oldUser == null) {
        let obj = {
            First_Name: fname,
            Last_Name: lname,
            User_Name: uname,
            Email: email,
            Age: age,
            Contact_number: contact,
            Password: encryptedPassword,
        }
        const user = await User(obj);
        user.save();
        res.send({ status: "ok" });
    }
    else {
        res.send({ error: "User Exists" });
    }
})



module.exports = router;