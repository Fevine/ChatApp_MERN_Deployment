import { Router } from 'express'
import { protectRoute } from '../Middlewares/protectRoute.js'
import { getUsersForSideBar } from '../Controllers/user.controller.js'

const router = Router()

router.get("/", protectRoute, getUsersForSideBar)

export default router
