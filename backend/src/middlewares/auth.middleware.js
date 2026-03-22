const jwt=require("jsonwebtoken")
const blacklistmodel = require("../models/blacklist.model")




async function decode(req,res,next){
const token=req.cookies.token


if(!token){
    return res.status(401).json({
        message:"Token not provided"
    })
}

const istokenblack=await blacklistmodel.findOne({token})
if(istokenblack){
    return res.status(401).json({
        message:"Token is invalid"
    })
}
try{
const decoded=jwt.verify(token,process.env.jwt_secrets)
req.user=decoded;

next()
}
catch(err){
    return res.status(401).json({
        message:"Invalid token."
    })
}



}
module.exports={decode}