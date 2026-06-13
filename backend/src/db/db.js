const mongoose=require("mongoose")
require("dotenv").config()

async function connectDb(){
    try{    
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected succesfully")
    }
    catch(err){
        console.log("error caught " ,err)
    }
}

module.exports=connectDb