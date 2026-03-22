
const cookieParser = require("cookie-parser")
const router=require("./routes/auth.routes")
const express=require("express")
const cors=require("cors")
const interviewrouter=require("./routes/ai.routes")
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
    credentials:true
}))



app.use("/api/auth",router);
app.use("/api/interview",interviewrouter);

module.exports=app;