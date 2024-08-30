const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
async function connectDB() {

    try{
        await mongoose.connect("mongodb+srv://admin:admin@cluster0.pxmkxaj.mongodb.net/?retryWrites=true&w=majority");
        console.log("Connected to MongoDB");
    } catch(err){
        console.error(err);
    }

}


module.exports = connectDB();