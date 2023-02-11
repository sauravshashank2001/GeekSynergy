const mongoose = require("mongoose");
const DB_URI = "mongodb://localhost:27017/geeksynergy";


exports.connectDatabase = () => { 
    mongoose.connect(DB_URI)
        .then(()=>{
            console.log(`DB is connected at ${DB_URI}`)
        })
        .catch(()=>{
            console.log(`Error in connectiong database`)

        })
}