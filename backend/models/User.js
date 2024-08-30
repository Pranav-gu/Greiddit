const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    First_Name: {
        type: String,
        required: true,
    },
    Last_Name: {
        type: String,
    },
    User_Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Age: {
        type: Number,
        required: true,
    },
    Contact_number: {
        type: String,
    },
    Password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("user", UserSchema);