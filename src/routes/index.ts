import { Router } from "express"
import userRoutes from "../routes/userRoutes"
import mapRoutes from "../routes/mapRoutes"
import { verifyToken } from "../middleware/verifyToken"
import "../strategy/localStrategy"

const router = Router()

router.use('/users', userRoutes)
router.use('/map', verifyToken, mapRoutes)

export default router