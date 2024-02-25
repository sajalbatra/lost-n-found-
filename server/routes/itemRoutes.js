import { Router } from "express";
const router = Router();
import itemController from "../controllers/itemController.js";
import checkUserAuth from "../middlewares/jwtAuth.js";

// Public routes
router.get("/getAll", itemController.getAllItems);

// Secured routes
router.post("/postItem", checkUserAuth, itemController.createItem);
router.get("/:itemId", itemController.getItemById); 
router.put("/:itemId", checkUserAuth, itemController.updateItem); 
router.delete("/:itemId", checkUserAuth, itemController.deleteItem); 

export default router;
