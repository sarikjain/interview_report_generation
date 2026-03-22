require("dotenv").config();
const express=require("express")
const app=require("./src/app")
const connectdb=require("./src/db/db")

connectdb();



app.listen(3000,()=>{
    console.log("Server is initialised");
})