const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const cookie=require("cookie-parser")
const blacklistModel=require("../models/blacklist.model")
const notificationModel=require("../models/notification.model")




async function registerUser(req,res){
  try{
      const {username,password,email,contact,location}=req.body;
    const admin = await userModel.findOne({role:"admin"})
   
    

    if(!username || !email || !password || !contact ||!location){
        return res.status(400).json({
            message:"Please provide required details"
        })
    }

    const isUserAlreadyExist=await userModel.findOne({
        $or:[{email},
            {contact}
        ]
    })
    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User already exist"
        })


    }

    const hash = await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,email,password:hash,contact,role:"user",status:"approved",location
    })
    const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET)
    res.cookie("token",token)
    
    if(admin){
        //add notification
    await notificationModel.create({
            receiverId:admin._id,
            senderId:user._id, //logged in user details
            message:"New user registered",
            type:"registration",
            referenceId:user._id
        });
    }
    res.status(201).json({
        message:"User registered successfully"
    })
  }
  catch(err){
    console.error("Register Error:", err);
        return res.status(500).json({
            message: "Server error"
        });
  }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Check input
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        // Find user
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        

        if (user.status === "blocked") {
            return res.status(403).json({
                message: "Your account is blocked by the admin"
            });
        }

        // Generate token ONLY if approved
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        );

        res.cookie("token", token);

        return res.status(200).json({
            message: "Login successful",
            user:{
                 _id: user._id,
                 username:user.username,
                email: user.email,
                role: user.role,
                status: user.status,
                location:user.location,
                contact:user.contact
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

async function getProfile(req,res) {

 //verifying the token in middleWare
 try{
  
    return res.status(200).json({
        message:"Profile fetched successfully",
        user:req.user
    })
 }
 catch(err){
    console.log("Error caught ",err)
 }

    
}

async function updateProfile(req,res){
   try{
        const {username,contact,location}=req.body;
       
        if(contact && contact.length !==10)
        {
            return res.status(400).json({
                message:"contact must be 10 digits"
            })
        }
        
           const updatedUser=await userModel.findByIdAndUpdate(
            req.user._id,
            {
               username,contact,location
            },
            {returnDocument:'after'} //returns updated info
        ).select("-password") //return every thing except password
       return res.status(200).json({
            message:"Profile updated successfully",
            user:updatedUser
        })


   }
      
    
     catch(err){
        console.log(err)
       res.status(401).json({
        message:"Invalid or expired token"
       })
     }

}

async function changepassword(req,res){
    const {oldPassword,updatePassword}=req.body;

    
    try{
             
        if(!oldPassword || !updatePassword){
            return res.status(400).json({
                message:"Please provide both old and new password"
            })
        }

        const isPasswordValid=await bcrypt.compare(oldPassword,req.user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                message:"password is invalid , enter correct password and update your password"
            })
        }
        const hash=await bcrypt.hash(updatePassword,10)
        const changePassword=await userModel.findByIdAndUpdate(
            req.user,
            {
                password:hash
            },
            {returnDocument:'after'}
        )
        res.status(200).json({
            message:"Password updated successfully",
            user:req.user
        })

    }
    catch(e){
        console.log("Error caught ",e)
    }

}

async function logOut(req,res){
   try{
     const token=req.cookies.token;
    

    if(token){
         const decoded=jwt.verify(token,process.env.JWT_SECRET)
        await blacklistModel.create({token,
            expiresAt:new Date(decoded.exp*1000)
        })
    }
    
    res.clearCookie("token");
    res.status(200).json({
        message:"user logged out"
    })
   }
   catch(err){
    console.log("logout error")
      return res.status(500).json({
            message: "Server error"
        });
   }
   
    
}



module.exports={registerUser,
    loginUser,
    getProfile,
    updateProfile,
    changepassword,
    logOut
}