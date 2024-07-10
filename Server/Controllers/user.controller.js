import { User } from "../Models/user.model.js"

export async function getUsersForSideBar(req, res) {
    try {
        const loggedInUserId = req.user._id

        // All users except you
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        res.status(201).json(filteredUsers)

    } catch (error) {
        res.status(400).json({ error: "Something went wrong!" })
    }
}