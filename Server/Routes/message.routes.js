import { Router } from "express";
import { getMessages, sendMessage } from "../Controllers/message.controllers.js";
import { protectRoute } from "../Middlewares/protectRoute.js";

const router = Router()

router.get("/:id", protectRoute, getMessages)

router.post("/send/:id", protectRoute, sendMessage)

export default router
