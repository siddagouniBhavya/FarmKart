import cron from "node-cron";
import orderModel from "../models/order.model.js";
import notificationModel from "../models/notification.model.js";

const completeOrderCron = () => {

  // Every day at 12 AM
  cron.schedule("0 0 * * *", async () => {

    try {

      console.log(
        "Running complete order cron"
      );

      const today = new Date();

      today.setHours(0, 0, 0, 0);

      // Find accepted orders whose rental ended
      const orders = await orderModel
        .find({
          status: "accepted",
          endDate: { $lte: today },
        })
        .populate("userId", "username")
        .populate("ownerId", "username")
        .populate("equipmentId", "title");

      console.log(
        "Orders Found:",
        orders.length
      );

      for (const order of orders) {

        // Update status
        order.status = "completed";

        await order.save();

        const renterName =
          order.userId?.username ||
          "User";

        const ownerName =
          order.ownerId?.username ||
          "Owner";

        const equipmentName =
          order.equipmentId?.category ||
          "Equipment";

        // Notification for renter
        await notificationModel.create({
          receiverId: order.userId._id,

          senderId: order.ownerId._id,

          message: `Your booking for "${equipmentName}" has been completed successfully with owner ${ownerName}.`,

          type: "complete",

          referenceId: order._id,
        });

        // Notification for owner
        await notificationModel.create({
          receiverId: order.ownerId._id,

          senderId: order.userId._id,

          message: `Booking for "${equipmentName}" by renter ${renterName} has been completed successfully.`,

          type: "complete",

          referenceId: order._id,
        });

        console.log(
          `Completed Order: ${order._id}`
        );
      }

    } catch (err) {

      console.log(
        "Complete Order Cron Error:",
        err
      );
    }
  });
};

export default completeOrderCron;