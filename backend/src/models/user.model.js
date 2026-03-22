const mongoose=require("mongoose")


const userschema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
type:String,
unique:true,
required:true
    },
    password:{
        type:String,
        required:true
    }
})

const usermodel=mongoose.model("user",userschema)
module.exports=usermodel;