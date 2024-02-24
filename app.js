import express from "express"
import cors from "cors"
import userRouter from "./src/routes/user.route.js"
import itemRouter from "./src/routes/item.route.js"
const app=express();
//cors
app.use(cors())

app.use(express.json())
app.use("/api/v1/user",userRouter)
app.use("/api/v1/item",itemRouter)

export default app