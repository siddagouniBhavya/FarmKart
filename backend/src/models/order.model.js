const mongoose=require("mongoose")

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "equipment",
      required: true
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date,
      required: true
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled","availability_request","expired"],
      default: "pending"
    },
    reminderSent: {
      type:Boolean,
      default:false
    },
  },

  {
    timestamps: true
  }
);


const orderModel=mongoose.model("order",orderSchema)
module.exports=orderModel;