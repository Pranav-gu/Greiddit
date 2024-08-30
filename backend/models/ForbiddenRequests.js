const mongoose = require('mongoose');
const { Schema } = mongoose;

const ForbiddenRequestsSchema = new Schema({            // User with name=Name cannot send Join Request to User with name=User_Name
    Name: {
        type: String,
        required: true,
    },
    User_Name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("forbidden_request", ForbiddenRequestsSchema);