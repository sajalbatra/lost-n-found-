import {createitem, returnto } from "../controllers/item.controller.js";
import { Router } from "express";

const router=Router();

router.post("/createitem/:userid",createitem);
router.post("/returnto/:userid",returnto);

export default router;