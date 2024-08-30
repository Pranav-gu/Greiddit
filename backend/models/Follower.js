const mongoose = require('mongoose');
const { Schema } = mongoose;

const FollowerSchema = new Schema({  
    User_Name_user: {
        type: String,
        required: true,
    },
    User_Name_follower: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("follower", FollowerSchema);