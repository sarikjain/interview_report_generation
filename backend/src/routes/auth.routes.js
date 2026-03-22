const express=require("express")
const authcontroller=require("../controllers/authcontroller");

const authmiddlware=require("../middlewares/auth.middleware")

const router=express.Router();




router.post("/login",authcontroller.loginuser)
router.post("/register",authcontroller.registeruser)
router.get("/logout",authcontroller.logoutuser)
router.get("/get-me",authmiddlware.decode,authcontroller.getmeuser)




module.exports=router;
