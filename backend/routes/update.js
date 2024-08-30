const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret_key_which_is_used_for#protecting$$$$$all_the_backend_1237%@93y3______routes";

router.post('/', async (req, res) => {
    const token = req.body;
    try {
        console.log("Signal from update.js*********************");
        const user = jwt.verify(token.token, JWT_SECRET);
        const user_id = user.userId;
        const fname = token.fname;
        const lname = token.lname;
        const uname = token.uname;
        const password = token.password;
        const age = token.age;
        const contact = token.contact;
        const email = token.email;
        console.log(user_id, fname, lname, uname, password, age, contact, email);

        // await User.findOne({ _id: { $eq: user_id }}).then(async(data) => {
        // console.log("user found", user);
        const encryptedPassword = await bcrypt.hash(password, 10);
        // let obj = {
        //     First_Name: fname,
        //     Last_Name: lname,
        //     User_Name: uname,
        //     Email: email,
        //     Age: age,
        //     Contact_number: contact,
        //     Password: encryptedPassword,
        // }
        // const user1 = await User(obj);
        // user1.save();

        // })
        let myquery = { _id: user_id };
        let newvalues = { $set: {First_Name: fname, Last_Name: lname, User_Name: uname, Age: age, Password: encryptedPassword, Contact_number: contact } };
        User.updateOne(myquery, newvalues, function (err) {
            if (err) throw err;
            console.log("1 document updated");
            // db.close();
        });
        res.send({ status: "ok", data: token, userId: user_id, fname: fname, lname: lname, uname: uname, email: email, age: age, contact: contact, password: password, location: "update.js" })
        // .catch((error) => {
        // res.send({ status: "error", data: error})
        // });
        // }
        // res.json({status: "error", error: "Invalid Password"});
    } catch (error) {
        console.log(error);
        res.send({ error: "error" });
    }
})

module.exports = router;