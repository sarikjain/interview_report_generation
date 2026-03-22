const express=require("express")

const interviewrouter=express.Router()
const upload=require("../middlewares/multer")
const authmiddleware=require("../middlewares/auth.middleware")
const interviewcontroller=require("../controllers/ai.controller")


interviewrouter.post(
  "/",
  authmiddleware.decode,   // ✅ add back
  upload.single("resume"),
  interviewcontroller.generatereport
);


interviewrouter.get("/report/:interviewId",authmiddleware.decode,interviewcontroller.getinterviewreportbyid)
interviewrouter.get("/",authmiddleware.decode,interviewcontroller.getallinterviews)

module.exports=interviewrouter
//taskkill /F /IM node.exe