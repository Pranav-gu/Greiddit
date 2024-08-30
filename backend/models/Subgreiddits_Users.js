const mongoose = require('mongoose');
const { Schema } = mongoose;

const Subgreiddit_UsersSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    User_Name: {
        type: String,
        required: true,
    },
    Is_Blocked: {
        type: Boolean,
        required: true, 
    }
});

module.exports = mongoose.model("subgreiddit_users", Subgreiddit_UsersSchema);