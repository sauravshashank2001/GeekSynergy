const app = require("./app");
const {connectDatabase} = require("./config/database")
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`server is live at ${process.env.PORT}`)
})