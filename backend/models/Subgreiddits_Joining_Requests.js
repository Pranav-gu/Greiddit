const mongoose = require('mongoose');
const { Schema } = mongoose;

const Subgreiddit_Joining_ReqSchema = new Schema({
    Sender: {
        type: String,
        required: true,
    },
    Receiver: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("subgreiddit_join_req", Subgreiddit_Joining_ReqSchema);