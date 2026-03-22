const { default: mongoose } = require("mongoose")
const usermodel=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const blacklistmodel=require("../models/blacklist.model")




async function registeruser(req,res){
const{username,email,password}=req.body

if(!username || !email || !password){
   return res.status(400).json({
        message:"Please provide username,email and password"
    })
}
const isthere=await usermodel.findOne({
    $or:[
        {username},{email}
    ]
})

if(isthere){
   return  res.status(400).json({
        message:"Account already exist with this email or username"
    })
}
const hash=await bcrypt.hash(password,10)
const user =await usermodel.create({
    username,email,password:hash
})

const token= jwt.sign({
    id:user._id,
    username:user.username

},process.env.jwt_secrets,{ expiresIn:"1d"})


res.cookie("token",token)
res.status(200).json({
    message:"User created succesfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
})








}
async function loginuser(req, res) {
    const { email, password } = req.body;

    // ✅ Add validation
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const user = await usermodel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const ispasswordvalid = await bcrypt.compare(password, user.password);

    if (!ispasswordvalid) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.jwt_secrets, { expiresIn: "1d" });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax"
    });

    return res.status(200).json({
        message: "Login successful",
        user
    });
}
async function logoutuser(req,res){
const token=req.cookies.token
if(token){
    await blacklistmodel.create({token})
}
    res.clearCookie("token")
    res.status(200).json({
        message:"User logged out succesfully"
    })
}
async function getmeuser(req,res){
const user=await usermodel.findById(req.user.id)
res.status(200).json({
    message:"User details fetched sucessfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email


    }
})


}
    


module.exports={registeruser,loginuser,logoutuser,getmeuser};