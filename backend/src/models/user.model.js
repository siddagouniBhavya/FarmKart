const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    email:{
      type:String,
        required:[true,"Email is required"],
         unique:true,
        
    },
    contact:{
         type:String,
        required:[true,"contact number is required"],
       
        
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
    status:{
        type:String,
        enum:["restricted","approved","blocked"],
        default:"pending",
    },
    location:{
        type:String,
        required:true
    }
})

const userModel=mongoose.model("user",userSchema)

module.exports=userModel;