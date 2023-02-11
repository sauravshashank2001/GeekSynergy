const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter a name"]
    },
    email:{
        type: String,
        required: [true,"please enter a name"],
        unique:[true,"Email already exist"]
    },
    password:{
        type: String,
        required: [true,"please enter a password"],
        minlength:[6,"Password must be of minimum length 6 character"]
    },
    phone:{
        type: String,
        required: [true,"Please enter your Phone Number"]
    },
    profession:{
        type:String,
        required: [true,"Please enter your profession"]
    }
});

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})


userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}


userSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}

module.exports = mongoose.model("User",userSchema);