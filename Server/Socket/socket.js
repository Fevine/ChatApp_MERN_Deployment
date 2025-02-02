import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app = express()


const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST"],
  }
})

export function getReceiverSocketId(receiverId) {
  return userSocketMap[receiverId]
}

const userSocketMap = {}

io.on('connection', (socket) => {
  console.log("User connected: ", socket.id);

  const userId = socket.handshake.query.userId
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // For sending events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
    delete userSocketMap[userId]
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

  })
})

export { app, server, io }
