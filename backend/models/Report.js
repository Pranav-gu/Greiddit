const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReportSchema = new Schema({
    Reported_By: {
        type: String,
        required: true,
    },
    Reported_User: {
        type: String,
        required: true,
    },
    Concern: {
        type: String,
        required: true,
    },
    Post_associated: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("report", ReportSchema);