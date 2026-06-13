const express=require("express")
const adminMiddleware=require("../middleware/admin.middleware")
const adminController=require("../controller/admin.controller")
const adminRouter=express.Router()
const verifyToken=require("../middleware/auth.middleware")
const adminControl = require("../middleware/admin.middleware")

adminRouter.get("/getAllUsers",verifyToken,adminControl,adminController.getAllUsers)
adminRouter.get("/getAllEquipments",verifyToken,adminControl,adminController.getAllEquipments)
adminRouter.get("/getAllOrders",verifyToken,adminControl,adminController.getAllOrders)
adminRouter.delete("/deleteEquipment/:id",verifyToken,adminControl,adminController.adminDeleteEquipment)
adminRouter.patch("/blockUser/:id",verifyToken,adminControl,adminController.blockUser)
adminRouter.get("/dashboardAdmin",verifyToken,adminControl,adminController.dashboardAdmin)
adminRouter.get("/getLatestOrders",verifyToken,adminControl,adminController.getLatestOrders)
adminRouter.get("/getRecentNotifications",verifyToken,adminControl,adminController.getRecentNotifications)
adminRouter.patch("/unblockUser/:id",verifyToken,adminControl,adminController.unBlock
)

module.exports=adminRouter;