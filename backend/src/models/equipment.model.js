const mongoose=require("mongoose")

const equipmentSchema=mongoose.Schema({
    name:{
        type:String, //it takes a unique id
         required:true
    },
    category:{
        type:String,
        enum:["tractor","harvester","plough","corn planter","rotator","dozer","rotator tiller"],
        required:true,
        lowercase:true
    },
    price:{
        type:Number,
        required:[true,"price is required"]
    },
    location:{
        type:String,
        required:[true,"Location is required"]
    },
    description:{
        type:String,
        required:true
    },
    availability:{
       type:Boolean,
       default:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    image:{
        type:String,
        required:true
    },
    vehicleNo:{
        type:String,
        required:true
    }
})

const equipmentModel=mongoose.model("equipment",equipmentSchema)
module.exports=equipmentModel;