import { User } from "../Models/user.model.js"
import bcryptjs from 'bcryptjs'
import { genToken } from "../Utils/genToken.js"

export async function SignUp(req, res) {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body

        if (password !== confirmPassword) {
            res.status(400).json({ error: "Passwords doen't match!" })
            return
        }

        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "Username already exists!" })
        }

        // HASH PASSWORD
        const salt = await bcryptjs.genSalt(10)

        const hasedPassword = await bcryptjs.hash(password, salt)

        // Pic

        const picUrl = "https://avatar.iran.liara.run/public/<gender>?username=<username>"

        // Create user

        const newUser = new User({
            fullName,
            username,
            password: hasedPassword,
            gender,
            profilePic: picUrl.replace("<gender>", gender === "male" ? "boy" : "girl").replace("<username>", username)
        })

        if (newUser) {
            try {
                genToken(newUser._id, res)
                await newUser.save()

                res.status(201).json({
                    _id: newUser._id,
                    fullname: newUser.fullName,
                    username: newUser.username,
                    profilePic: newUser.profilePic,
                })
            } catch (error) {
                res.status(400).json({ error: "Invalid user data!" })
            }
        }

    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" })
    }
}

export async function Login(req, res) {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if (!user) {
            res.status(400).json({ error: `${username} named user doesn't exists!` })
            return
        }

        const CheckPass = await bcryptjs.compare(password, user.password)

        if (!CheckPass) {
            res.status(400).json({ error: "Password or username is not correct!" })
            return
        }

        genToken(user._id, res)

        res.status(201).json({
            _id: user._id,
            fullname: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })

    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" })
    }
}

export async function Logout(req, res) {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(201).json({ message: "Logged out successfully!" })
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" })
    }
}
