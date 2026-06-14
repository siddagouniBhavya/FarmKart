const express = require("express");
const cors=require("cors")
const connectDb=require("../src/db/db")
const router=require("../src/routes/user.route")
const equipmentRouter=require("./routes/equipment.route")
const cookieParser=require("cookie-parser")
const orderRouter=require("./routes/order.route")
const adminRouter=require("./routes/admin.route")
const nRouter=require("./routes/notification.route")

//cron
require("./cron/bookingReminder.cron")
connectDb()

const app=express()
app.use(express.json())
app.use(cors({
    origin:"https://farm-kart-self.vercel.app/",
    credentials:true
}))

app.use(cookieParser())
app.use("/api/user",router)
app.use("/api/equipment",equipmentRouter)
app.use("/api/order",orderRouter)
app.use("/api/admin",adminRouter)
app.use("/api/notification",nRouter);

module.exports=app;