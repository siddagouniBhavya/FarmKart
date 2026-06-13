const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
   
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ["booking", "status_update", "cancel", "complete","registration","admin_activity","equipment_removed","availability_request","booking_reminder"],
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  audience :{
    type:String,
    enum:["admin","user"],
   
  },
}, { timestamps: true });

const notificationModel = mongoose.model("notification", notificationSchema);

module.exports = notificationModel;