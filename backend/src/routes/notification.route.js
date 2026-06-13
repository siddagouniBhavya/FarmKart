const verifyToken=require("../middleware/auth.middleware")
const express=require("express")
const router=express.Router();
const nController=require("../controller/notification.controller");

router.get(
  "/getNotifications",
  verifyToken,
  nController.getNotifications
);

router.patch(
  "/markAsRead/:id",
  verifyToken,
  nController.markAsRead
);

router.patch(
  "/markAllAsRead",
  verifyToken,
  nController.markAllAsRead
);

router.delete("/deletenotify/:id",verifyToken,nController.deleteNotify)

module.exports=router;