
//checking is logged in user is admin , if admin so he is allowed to access the admin features
async function adminControl(req,res,next){
    
   try{
     if(req.user.role !=="admin"){
        return res.status(403).json({
            message :"Access Denied. Admin only"
        });
    }
    next();
   }
   catch(err){
    console.log(err)
    return res.status(500).json({
        message:"Internal Server Error"
    })
   }
   
}
module.exports=adminControl;