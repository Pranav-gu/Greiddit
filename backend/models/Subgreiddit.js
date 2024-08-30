const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubgreidditSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Tags: {
        type: String,
    },
    Banned_Keywords: {
        type: String,
    },
    User_Name: {
        type: String,
    }
});

module.exports = mongoose.model("subgreiddit", SubgreidditSchema);