const User = require("../model/User");
// const result = require("../../frontend/src/data")
//User SignUp

exports.register = async(req,res)=>{
    try{
        const {name,email,password,phone,profession} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success: false,
                message: "user already exists"
            })
        }
        user = await User.create({name,email,password,phone,profession});
        const token = await user.generateToken();
        const option ={
            expires: new Date(Date.now()+(1000 *60*60*24*30)),
            httpOnly: true,
            secure: true
        }
        res.status(201).cookie("token",token,option).json({
            success: true,
            message: "User registered successfully",
            user,
            token
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message

        })
    }
}


//User Login

exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success: false,
            message: "User doesnt exist"
        })
    }

    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return res.status(400).json({
            success: false,
            message:"enter right credentials"
        })
    }

    const token = await user.generateToken();
    const option = {
        expires: new Date(Date.now()+(1000 *60*60*24*30))
        ,httpOnly: true,
        secure: true
    }

    res.status(200).cookie("token",token,option).json({
        success: true,
        message:"User logged In",
        user,token
    })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message

        })
    }
    
};

//my profile

exports.getMyProfile = async (req, res, next) => {
    if(req.user){
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success: true,
            user,
          });
    }
    else{
        res.status(500).json({
            message: "please login"
        })
    }
  
    
  };


//User Logout

exports.logout = async(req,res)=>{
    try{
        res.status(200).cookie("token",null,{expires: new Date(Date.now())}).json({
            success: true,
            message: "Logged out Successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//getCompany Info

exports.getCompanyInfo = async(req,res) => {
    try{
    const user = await User.findById(req.user._id);
    const details = {
        "Company": "Geeksynergy Technologies Pvt Ltd",
        "Address": "Sanjayanagar, Bengaluru-56",
        "Phone": user.phone,
        "Email": user.email,
        "Name": user.name,
     }
    res.status(200).json({
        success: true,
        message: "Details fetched Successfully",
        details
    })
}
    catch(err){
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}

// exports.getData = async(req,res)=>{
//     res.status(200).json({
//         success: true,
//         message: "data fetched successfully",
//         result
//     })
// }

//all users

exports.getAllUser = async(req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).json({
            success: true,
            users
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}

//update profile

exports.updatProfile = async(req,res)=> {
    try{
        const user = await User.findById(req.params.id);
        const {name,phone} = req.body;
        
        if(name) user.name=name;
        if(phone) user.phone=phone;
        await user.save();
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
        });

    }
    catch(err){
        res.status(200).json({
            success: true,
            message: "profile updated successfully"
        })
    }
}


exports.deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(400).json({
            success: false,
            message: "user doesnt exist"
        })
    }
    await user.remove();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  };