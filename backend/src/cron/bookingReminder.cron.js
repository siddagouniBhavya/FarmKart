const cron = require("node-cron");

const orderModel = require("../models/order.model");

const notificationModel = require("../models/notification.model");

cron.schedule("0 9,18 * * *", async () => {
  // reminder on 9 am and 6 pm

  try {

    console.log("Running reminder cron");

    const now = new Date();

    // tomorrow start
    const tomorrowStart = new Date();

    tomorrowStart.setDate(now.getDate() + 1);

    tomorrowStart.setHours(0,0,0,0);

    // tomorrow end
    const tomorrowEnd = new Date();

    tomorrowEnd.setDate(now.getDate() + 1);

    tomorrowEnd.setHours(23,59,59,999);

    // today start
    const todayStart = new Date();

    todayStart.setHours(0,0,0,0);

    // find pending orders
    const orders = await orderModel
      .find({
        status: "pending"
      })
      .populate("userId", "username")
      .populate("equipmentId", "name");

    console.log("Orders Found", orders.length);

    for (const order of orders) {

      const startDate = new Date(order.startDate);

      // ========================
      // REMINDER
      // ========================

      if (
        startDate >= tomorrowStart &&
        startDate <= tomorrowEnd
      ) {

        const alreadySent =
          await notificationModel.findOne({

            receiverId: order.ownerId,

            referenceId: order._id,

            type: "booking_reminder"
          });

        if (!alreadySent) {

          await notificationModel.create({

            receiverId: order.ownerId,

            senderId: order.userId._id,

            message:
              `${order.userId.username} requested your equipment "${order.equipmentId.name}". Accept before booking date or request will expire.`,

            type: "booking_reminder",

            referenceId: order._id
          });

          console.log(
            `Reminder sent ${order._id}`
          );
        }
      }

      // ========================
      // AUTO EXPIRE
      // ========================

      const bookingDay = new Date(startDate);

      bookingDay.setHours(0,0,0,0);

      if (todayStart >= bookingDay) {

        order.status = "expired";

        await order.save();

        await notificationModel.create({

          receiverId: order.userId._id,

          senderId: order.ownerId,

          message:
            `Your booking request for "${order.equipmentId.name}" expired because owner did not respond.`,

          type: "status_update",

          referenceId: order._id,
          audience :'user'
        });

        console.log(
          `Order expired ${order._id}`
        );
      }
    }

  } catch (err) {

    console.log(err);

  }
});