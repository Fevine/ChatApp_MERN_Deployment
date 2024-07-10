import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import AuthRouter from './Routes/auth.routes.js'
import UserRouter from './Routes/user.routes.js'
import MessageRouter from './Routes/message.routes.js'
import { connectionToDB } from './DB/connectionToDB.js'
import { app, server } from './Socket/socket.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const CON_URL = process.env.CON_URL

const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.use("/api/auth", AuthRouter)
app.use("/api/messages", MessageRouter)
app.use("/api/users", UserRouter)

app.use(express.static(path.join(__dirname, "/Client/dist")))

app.get("*", ((req, res) => {
    res.sendFile(path.join(__dirname,"/Client","dist","index.html"))
}))

server.listen(PORT, () => {
    connectionToDB()
    console.log(`Server Online at ${PORT}`);
})
