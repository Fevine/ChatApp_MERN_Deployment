import jwt from 'jsonwebtoken';
import { User } from '../Models/user.model.js';

export async function protectRoute(req, res, next) {
    try {
        const token = req.cookies.jwt

        if (!token) {
            res.status(401).json({ error: "Unauthorized - No token provided!" })
            return
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        if (!decoded) {
            res.status(401).json({ error: "Unauthorized - Invalid token!" })
            return
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            res.status(401).json({ error: "User not found!" })
        }

        req.user = user

        next()

    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" })
    }
}
