const express=require("express")
const userController=require("../controller/user.controller")
const router=express.Router()
const verifyToken=require("../middleware/auth.middleware")

router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)
router.get("/getProfile",verifyToken,userController.getProfile)
router.patch("/updateProfile",verifyToken,userController.updateProfile)
router.patch("/changePassword",verifyToken,userController.changepassword)
router.post("/logout",userController.logOut)

module.exports=router