const mongoose=require("mongoose")


const blackschema=mongoose.Schema({
   token:{
    type:String,
    required:true
   }
},{
    timestamps:true,
})

const blacklistmodel=mongoose.model("blacklist",blackschema)
module.exports=blacklistmodel;