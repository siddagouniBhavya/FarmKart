const notificationModel=require("../models/notification.model")

async function getNotifications(req,res){
    try{
        const notifications=await notificationModel.find({
            receiverId:req.user._id
        })
        .sort ({createdAt:-1})
        .populate("senderId","username");

        return res.status(200).json({
            notifications
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
async function markAsRead(req, res) {
  try {
    const { id } = req.params;

    const notification =
      await notificationModel.findByIdAndUpdate(
        id,
        {
          isRead: true,
        },
        {returnDocument:"after" }
      );

    return res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
async function markAllAsRead(req, res) {
  try {
    await notificationModel.updateMany(
      {
        receiverId: req.user._id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    return res.status(200).json({
      message: "All notifications marked as read",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function deleteNotify(req,res){

  try{
    const {id}=req.params;
    const notify=await notificationModel.findByIdAndDelete(id);
    if(!notify){
      return res.status(404).json({
        message:"Notification not found"
      })
    }

    
    return res.status(200).json({
      message:"Notification deleted successfully"
    })

  }
  catch(err){
    console.log(err)
    return res.status(500).json({
      message:"Internal server error"
    })
  }
}
module.exports={
    getNotifications,markAllAsRead,markAsRead,deleteNotify
}