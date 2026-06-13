const mongoose=require("mongoose")
const orderModel=require("../models/order.model")
const notificationModel=require("../models/notification.model")
const equipmentModel=require("../models/equipment.model")


//when user clicks on book now this api is called
async function createBooking(req,res){
try{
        const {id}=req.params;
    const {startDate,endDate}=req.body;
    const userId=req.user.id
   
  
    if(!id || !startDate || !endDate){
        return res.status(400).json({
            message:"Provide all required fields"
        })
    }
    const equipment=await equipmentModel.findById(id);
    if(!equipment){
        return res.status(400).json({
            message:"Equipment not found"
        })
    }
  
    const ownerId=equipment.owner 
    if(userId.toString() === ownerId.toString())
    {
        return res.status(400).json({
            message:"owner should not book there own equipments"
        })
    }
    if(equipment.availability===false){
        return res.status(400).json({
            message:"Equipment is not available"
        })
    }
    let start=new Date(startDate)
    let end=new Date(endDate)
    let today=new Date //returns the current date
    today.setHours(0,0,0,0)
    start.setHours(0,0,0,0)
    if(start<today){
        return res.status(400).json({
            message:"Start date cannot be past"
        })
    }

    if(end<=start){
        return res.status(400).json({
            message:"End date must be after start date"
        })
    }

const days = Math.ceil(
  (new Date(endDate) - new Date(startDate)) /
  (1000 * 60 * 60 * 24)
) + 1;    
const tp=equipment.price *days

    if(equipment.status === "pending"){
        return res.status(403).json({
            message:"User not allowed to book"
        })
    }
     const order=await orderModel.create({
        userId,
        equipmentId:id,
        ownerId,
        startDate:start,
        endDate:end,
        totalPrice:tp,
        status:"pending"
    })
    await notificationModel.create({
        receiverId:equipment.owner,
        senderId:req.user.id,
        message:`Vehicle ${equipment.vehicleNo} has been successfully booked by ${req.user.username}`,
        type:"booking",
        referenceId:order._id
    });

    return res.status(200).json({
        message:"Order placed successfully",
        order

    })
    
}
catch(err){
    console.log(err)
    return res.status(500).json({
        message:"Internal server error"
    })
}

}
async function getMyOrders(req,res){
    try{
        
    const userId=req.user.id
    const equipments=await orderModel.find({userId:userId}).populate("userId" ,"username email contact")
    .populate("ownerId","username email contact")
    .populate("equipmentId","name image category")
   
    if(equipments.length===0){
        return res.status(400).json({
            message:"No orders found "
        })
    }
    return res.status(200).json({
        message:"Equipments fetched",
        equipments:equipments
    })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
async function getOrdersForVendor(req,res){
    try{
        const vendorId=req.user._id;
        //fetch orders where logged in user is the owner
        const orders=await orderModel
        .find({ownerId:vendorId})
        .populate("userId","username email contact location") //customer details
        .populate("equipmentId","name price location image")
          //equipment details

        //check if no orders found 
        if(orders.length===0)
        {
            return res.status(200).json({
                message:"No orders found for this vendor",
                orders
            });

        }
            const updatedOrders = orders.map((order) => {
            const startDate = new Date(order.startDate);
            const endDate = new Date(order.endDate);

            const diff =
            (endDate - startDate) / (1000 * 60 * 60 * 24);

            return {
            ...order._doc,
            totalDays: Math.ceil(diff),
            };
        });
        //send response
        return res.status(200).json({
            message:"Vendor orders fetched successdully",
            orders:updatedOrders
        })

    }
    catch(err){
        console.log("error fetched ",err)
        return res.status(500).json({
            message:"Server error"
        })
    }
}
//equipment owner updates the status of order
//user sends request of order (status=="pending")->vendor(equipment owner) sees and accept or reject
async function updateStatus(req, res) {
  try {

    const { id } = req.params;
    const { status } = req.body;
   
    const vendorId = req.user.id;

    if (!status) {
      return res.status(400).json({
        message: "Please enter status",
      });
    }

    const order = await orderModel.findById(id);
     const equipment =equipmentModel.findById(order.equipmentId)
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // only owner can update
    if (order.ownerId.toString() !== vendorId) {
      return res.status(403).json({
        message: "Only owner can make changes",
      });
    }

    // check expiry BEFORE update
    const today = new Date();

    const startDate = new Date(order.startDate);

    // remove time for accurate comparison
    today.setHours(0,0,0,0);
    startDate.setHours(0,0,0,0);
   
    if (
      today >= startDate &&
      order.status === "pending"
    ) {

      order.status = "expired";

      await order.save();

      // notify user
      await notificationModel.create({
        receiverId: order.userId,
        senderId: req.user.id,
        message:
          "Booking expired because owner did not respond before start date",
        type: "status_update",
        referenceId: order._id,
      });

      return res.status(400).json({
        message: "Booking expired",
      });
    }

    // update status
    order.status = status;

    await order.save();

    // notification message
     let vehicle=equipment?.vehicleNo || "this equipment";
    let message;

    if (status === "accepted") {
      message = 
        `Your booking for vehicle ${vehicle} has been accepted`;
    }

    else if (status === "rejected") {
      message =
      `Your booking for vehicle ${vehicle} has been rejected`;
    }

    else {
      message =
        `Your Booking Status Updated to ${status}`;
    }

    // notify user
    await notificationModel.create({
      receiverId: order.userId,
      senderId: req.user.id,
      message,
      type: "status_update",
      referenceId: order._id,
    });

    return res.status(200).json({
      message: "Order updated successfully",
      order,
    });

  }

  catch (err) {

    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function cancelOrder(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const order = await orderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    // ownership check
    if (order.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You are not allowed to cancel this order"
      });
    }

    if (order.status === "cancelled") {
      return res.status(400).json({
        message: "Order already cancelled"
      });
    }

    if (order.status === "rejected") {
      return res.status(400).json({
        message: "Rejected order cannot be cancelled"
      });
    }

    if (order.status === "completed") {
      return res.status(400).json({
        message: "Completed order cannot be cancelled"
      });
    }

    // only check start date if accepted
    if (order.status === "accepted") {
      const today = new Date();

      if (today >= order.startDate) {
        return res.status(400).json({
          message: "Cannot cancel after booking has started"
        });
      }
    }

    order.status = "cancelled";
    await order.save();

    await notificationModel.create({
      receiverId: order.ownerId,
      senderId: userId,
      message: "Booking has been cancelled by user",
      type: "cancel",
      referenceId: order._id
    });

    return res.status(200).json({
      message: "Order cancelled successfully",
      order
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
async function getSingleOrderDetails(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // 1. Find order and populate related data
    const order = await orderModel
      .findById(id)
      .populate("userId", "username email contact")
      .populate("equipmentId", "name price image location")
      .populate("ownerId", "username email");

    // 2. Check if order exists
    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    // 3. Authorization check
    if (
      order.userId._id.toString() !== userId.toString() &&
      order.ownerId._id.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        message: "You are not allowed to view this order"
      });
    }

    // 4. Send response
    return res.status(200).json({
      message: "Order fetched successfully",
      order
    });

  } catch (err) {
    console.log("Get Single Order Error:", err);
    return res.status(500).json({
      message: "Server error"
    });
  }
}

async function toggle_availability(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    // 1. Find equipment
    const equipment = await equipmentModel.findById(id);
   
    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    // 2. Check ownership
    if (equipment.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "owner only has access to change"
      });
    }

    // 3. Toggle availability
    equipment.availability = !equipment.availability;

    // 4. Save changes
    await equipment.save();

    // 5. Response
    return res.status(200).json({
      message: "Equipment availability updated successfully",
      availability: equipment.availability,
      equipment
    });

  } catch (err) {
    console.log("Toggle Availability Error:", err);
    return res.status(500).json({
      message: "Server error"
    });
  }
}
async function getActiveOrders(req,res) {
        try{
            const ownerId=req.user._id;
           const orders = await orderModel.find({
            ownerId,
            status: { $in: ["accepted", "completed"] }
        })
        .populate("userId", "username contact")
        .populate("equipmentId", "name image totalPrice status startDate endDate location");
        
   
            return res.status(200).json({
                message:"Active ordes fetched successfully",
                orders
            })
        }
        catch(err){
            console.log(err)
            return res.status(500).json({
                message:"Internal Server Error"
            });
        }
}



async function getBookedDates(req,res) {
  try{

        const today=new Date(); 

        const {equipmentId}=req.params;
        const orders=await orderModel.find({
          equipmentId:new mongoose.Types.ObjectId(equipmentId),

          status:"accepted",
          endDate: { $gte: today }
        }).select("startDate endDate");

        

        return res.status(200).json({
          bookedDates:orders
        })

  }
  catch(err){
    console.log(err)
    return res.status(500).json({
      message:"Internal Server Error"
    });
  }
  
}





module.exports={createBooking,
    getMyOrders,
    getOrdersForVendor,
    updateStatus,
    cancelOrder,
    getSingleOrderDetails,
    getBookedDates,
    toggle_availability ,
    getActiveOrders
    
}