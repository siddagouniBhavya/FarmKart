const orderModel = require("../models/order.model");

async function preventDoubleBooking(req, res, next) {
  try {
    const {id}=req.params
    const { startDate, endDate } = req.body;
    const equipmentId=id

    // 1. Basic validation
    if (!equipmentId || !startDate || !endDate) {
      return res.status(400).json({
        message: "Please provide equipmentId, startDate and endDate"
      });
    }
    
    // 2. Convert to Date objects
    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);

    // 3. Find overlapping bookings
    const conflictingOrder = await orderModel.findOne({
      equipmentId: equipmentId,
      status: { $in: ["pending", "accepted"] }, // ignore cancelled/rejected
      startDate: { $lte: newEnd },
      endDate: { $gte: newStart }
       
     
    });

    // 4. If conflict exists → reject
    if (conflictingOrder) {
      return res.status(400).json({
        message: "Equipment already booked for selected dates"
      });
    }

    // 5. No conflict → proceed
    next();

  } catch (err) {
    
    console.log("Double Booking Middleware Error:", err);
    return res.status(500).json({
      message: "Server error"
    });
  }
}

module.exports = preventDoubleBooking;