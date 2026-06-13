const express=require("express")
const verifyToken=require("../middleware/auth.middleware")
const equipmentController=require("../controller/equipment.controller")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})



const equipmentRouter=express.Router()
equipmentRouter.post("/add",upload.single("image"),verifyToken,equipmentController.addEquipment)
equipmentRouter.get("/getAll",equipmentController.getAll)
equipmentRouter.get("/singleEquipment/:id",verifyToken,equipmentController.getSingleEquipment)
equipmentRouter.get("/getMyEquipment",verifyToken,equipmentController.getMyEquipment)
// equipmentRouter.post("/updateEquipment/:id",verifyToken,equipmentController.updateEquipment)
equipmentRouter.patch("/updateEquipment/:id",verifyToken,equipmentController.updateEquipment)
equipmentRouter.delete("/deleteEquipment/:id",verifyToken,equipmentController.deleteEquipment)

module.exports=equipmentRouter
