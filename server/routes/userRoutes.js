import { Router } from "express";
const router=Router()
import userController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/jwtAuth.js";

//public routes
router.post("/register", userController.register);
router.post("/login",userController.login);


//secured routes
router.get("/getUser", checkUserAuth, userController.getUser);
router.post("/updateAccount",checkUserAuth, userController.updateDetail);
router.post("changePassword", checkUserAuth, userController.changePassword);



export default router;