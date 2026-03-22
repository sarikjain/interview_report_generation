const mongoose=require("mongoose")


async function connectdb() {

try{
    await mongoose.connect(process.env.mongo_uri)
    console.log("Database has been connected")
}
catch(err){
    console.log("Database not connected",err);
}
}


module.exports=connectdb;