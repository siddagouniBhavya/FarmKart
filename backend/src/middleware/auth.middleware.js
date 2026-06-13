require("dotenv").config()
const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")

async function verifyToken(req,res,next){
    try{
           const token =req.cookies.token;
            if(!token){
            return res.status(401).json({
                message:"Unauthorised ,Token not found"
             })
            }   

            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            const user=await userModel.findById(decoded.id).select("-password")
           
            if(!user){
                return res.status(404).json({
                    message:"User not found"
                })
            }
            req.user=user //attaching user to request
             next()
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Token is expired or invalid"
        })
    }
}

module.exports=verifyToken;