const userModel=require("../models/user.model")
const equipmentModel=require("../models/equipment.model")
const orderModel=require("../models/order.model")
const notificationModel=require("../models/notification.model")

//admin can view all users in the system
async function getAllUsers(req,res){
    try{
        const allUsers=await userModel.find({role:{$ne:"admin"}}).select("-password")

    if(!allUsers || allUsers.length===0)
    {
        return res.status(404).json({
            message:"NO Users found"
        })
    }
    return res.status(200).json({
        message:"Users fetched successfully",
        users:allUsers
    });
    
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}
//admin can view all equipments
async function getAllEquipments(req,res){
    try{
        const allEquipments=await equipmentModel.find().populate("owner","username email contact")
    if(!allEquipments || allEquipments.length===0){
        return res.status(404).json({
            message:"Equipments not found"
        })
    }

    return res.status(200).json({
        message:"All equipments fetched successfully",
        allEquipments
    })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
async function getAllOrders(req,res){

    const allOrder=await orderModel.find().populate("ownerId","username email contact").populate("userId","username email contact").populate("equipmentId").select("-createdAt -updatedAt -__v")
    if(!allOrder || allOrder.length===0){
        return res.status(404).json({
            message:"No Orders Found"
        })
    }

    return res.status(200).json({
        message:"Orders Fetched Successfully",
        allOrder
    })
}
//admin can remove any equipment from the system
async function adminDeleteEquipment(req,res){
    try{
        const {id}=req.params;
        const {reason}=req.body;

    const equipment=await equipmentModel.findById(id)
   
    if(!equipment){
        return res.status(404).json({
            message:"Equipment not found"
        })
    }
    //notification to user
    await notificationModel.create({
        receiverId:equipment.owner,
        message:`Your equipment was removed by admin , Reason : ${reason}`,
        type:"equipment_removed",
        referenceId:equipment._id,
        audience:"user"
    })
    //notification to admin
   await notificationModel.create({
    message:`Admin removed ${equipment.category}`,
    type:"admin_activity",
    referenceId:equipment._id,
    audience:"admin",
    
   })
   await equipmentModel.findByIdAndDelete(id);
    return res.status(200).json({
        message:"Equipment deleted successfully",
        equipment:equipment
    })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
async function blockUser(req,res){
    try{
        const {id}=req.params;
        const {reason}=req.body;
        const user=await userModel.findById(id);
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        if(user.status === "blocked"){
            return res.status(400).json({
                message:"User already blocked"
            })
        }
        await userModel.findByIdAndUpdate(id,
            {status:"blocked"}
        )

        //notification to user
        await notificationModel.create({
            receiverId:user._id,
            senderId:req.user._id,
            message:`Your account has been blocked by admin. Reason ${reason}`,
            type:"status_update",
            referenceId:user._id,
            audience:"user"
        });

        //notification to admin
        await notificationModel.create({
            message:"Blocked the account",
            type:"admin_activity",
            audience:"admin",
            referenceId:user._id
        })
        return res.status(200).json({
            message :"User blocked successfully",
            user
        })

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
async function  dashboardAdmin(req,res) {
    try{
    const totalUsers=await userModel.countDocuments()
    const totalEquipments=await equipmentModel.countDocuments()
    const totalOrder=await orderModel.countDocuments()
    const pendingUsers=await userModel.countDocuments({status:"pending"})
    return res.status(200).json({
        totalUsers:totalUsers,
        totalEquipments:totalEquipments,
        totalOrders:totalOrder,
        pendingUsers:pendingUsers
    })
    
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"internal server error"
        })
    }
}

async function getLatestOrders(req,res){

    try{

        const latestOrders =
        await orderModel.find()

        .populate(
            "ownerId",
            "username"
        )

        .populate(
            "userId",
            "username"
        )

        .populate(
            "equipmentId",
            "title"
        )

        .sort({createdAt:-1})

        .limit(5)

        if(
            !latestOrders ||
            latestOrders.length===0
        ){
            return res.status(404).json({
                message:"No Orders Found"
            })
        }

        return res.status(200).json({
            message:
            "Latest orders fetched successfully",

            latestOrders
        })

    }
    catch(err){

        console.log(err)

        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
async function getRecentNotifications(req,res){
    try{
        const notifications= await notificationModel.find({audience:"admin"}).populate("senderId","username").sort({createdAt:-1}).limit(5);
        return res.status(200).json({
            notifications
        });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}
async function  unBlock(req,res) {
    try{
        const {id}=req.params
        const user=await userModel.findById(id);
        if(!user){
            return res.status(400).json({
                message:"User not found"
            });

        }

        if(user.status!=="blocked"){
            return res.status(400).json({
                message:"User is not blocked"
            });
        }

        await userModel.findByIdAndUpdate(id,
            {
                status:"approved"
            }
        );
         //notification to user
         await notificationModel.create({
            receiverId:user._id,
            senderId:req.user._id,
            message:"Your account has been unblocked by admin",
            type:"status_update",
            referenceId:user._id,
            audience:"user"
         });

         await notificationModel.create({
            message:`Admin unblocked ${user.username}`,
            audience:"admin",
            type:"admin_activity",
            referenceId:user._id
         });
         return res.status(200).json({
                message:"User unblocked successfully"
         })

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
    
}

module.exports={getAllUsers,getAllEquipments,unBlock,getAllOrders,adminDeleteEquipment,blockUser,dashboardAdmin,getLatestOrders,getRecentNotifications}