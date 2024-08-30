const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    Text: {
        type: String,
        required: true,
    },
    Posted_By: {
        type: String,
        required: true,
    },
    Posted_In: {
        type: String,
        required: true,
    },
    Upvotes: {
        type: Number,
    },
    Downvotes: {
        type: Number,
    },
    Comments: {
        type: String,
    },
    Is_Saved: {
        type: Boolean,
    }
    // Subgreiddit_Name: {
    //     type: String,
    //     required: true,
    // }
});

module.exports = mongoose.model("post", PostSchema);