const mongoose = require('mongoose');
const { Schema } = mongoose;

const FollowingSchema = new Schema({
    User_Name_user: {
        type: String,
        required: true,
    },
    User_Name_following: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("following", FollowingSchema);