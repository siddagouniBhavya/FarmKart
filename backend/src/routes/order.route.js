const verifyToken=require("../middleware/auth.middleware")
const orderController=require("../controller/order.controller")
const overlapping = require("../middleware/order.middleWare")

const express=require("express")

const orderRouter=express.Router()

orderRouter.post("/createBooking/:id",verifyToken,overlapping,orderController.createBooking)
orderRouter.get("/getMyorders",verifyToken,orderController.getMyOrders)
orderRouter.get("/getOrdersForVendor",verifyToken,orderController.getOrdersForVendor)
orderRouter.patch("/updateStatus/:id",verifyToken,orderController.updateStatus)
orderRouter.patch("/cancelOrder/:id",verifyToken,orderController.cancelOrder)
orderRouter.get("/getSingleOrderDetails/:id",verifyToken,orderController.getSingleOrderDetails)

orderRouter.patch("/toggle_availability/:id",verifyToken,orderController.toggle_availability)
orderRouter.get("/getActiveOrders",verifyToken,orderController.getActiveOrders)

orderRouter.get("/getBookedDates/:equipmentId",verifyToken,orderController.getBookedDates)
module.exports=orderRouter
