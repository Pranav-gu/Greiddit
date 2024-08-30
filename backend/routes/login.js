const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "secret_key_which_is_used_for#protecting$$$$$all_the_backend_1237%@93y3______routes"; 

// router.post('/', (req, res) => {
//     console.log("Control Reaches here");
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     console.log(req.body);
//     let uname = req.body.uname;
//     let password = req.body.password;
//     console.log(User);
//     User.findOne({User_Name: {$eq: uname}, Password: {$eq: password} }, function (err, docs) {
//         if (err){
//             // console.log(User);
//             console.log(err);
//             res.send(null);
//         }
//         else{
//             // if (password != Password)
//             const x = User.findOne({User_Name: {$eq: uname}, Password: {$eq: password} });
//             console.log(x.User_Name, x.Password, x.Email, x.Age, x.First_Name, x.Last_Name, x.Contact_number);
//             // console.log(docs);
//             res.send(docs);
//         }
//     });
// })

router.post('/', async(req, res) => {
    // console.log(req.body);
    let uname = req.body.uname;
    let password = req.body.password;
    const user = await User.findOne({ User_Name: { $eq: uname }});
    // console.log("password = ", password);
    if (user == null)
    {
        res.send({ error: "User Does Not Exist. Please Register First." });
    }
    else if (await bcrypt.compare(password, user.Password)) {
        const token = jwt.sign({uname: user.User_Name, userId: user._id}, JWT_SECRET);
        if (res.status(201)){
            return res.json({status: "ok", data: token, userId: user._id, fname: user.First_Name, lname: user.Last_Name, uname: user.User_Name, email: user.Email, age: user.Age, contact: user.Contact_number, password: password});
        }
        else{
            return res.json({error: "error"});
        }
    }
    else
        res.json({status: "error", error: "Invalid Password"});
})

module.exports = router;