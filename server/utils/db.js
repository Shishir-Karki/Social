const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;


const connectDb = async ()=> {
    try{
        await mongoose.connect(uri);
        console.log('MongoDB Connected...');

    }catch(error){
    console.error("The connection to the database failed");
    process.exit(0);
    }
}


module.exports = connectDb;