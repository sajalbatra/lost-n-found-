import { createUser,changePassword,loginUser,updateAccountdetails } from "../controllers/user.controller.js";
import { Router } from "express";
import { handleImageUpload } from "../utils/upload.js";
import {getimage,deleteimage} from "../controllers/fileupload.controller.js"

const router=Router()

router.post("/createuser",createUser)
router.post("/changepassword",changePassword)
router.post("/login",loginUser)
router.post("/updateaccount",updateAccountdetails)
router.post("/file/upload",handleImageUpload)
router.get("/file/:filename",getimage)
router.delete("/file/:filename",deleteimage)


export default router