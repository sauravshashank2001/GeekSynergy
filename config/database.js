const mongoose = require("mongoose");
const DB_URI = "mongodb+srv://sauravshashank27:yoyohoney@cluster0.wlyvnmn.mongodb.net/geekSynergy?retryWrites=true";


exports.connectDatabase = () => { 
    mongoose.connect(DB_URI)
        .then(()=>{
            console.log(`DB is connected at ${DB_URI}`)
        })
        .catch(()=>{
            console.log(`Error in connectiong database`)

        })
}