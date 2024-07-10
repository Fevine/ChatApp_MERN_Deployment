import { Chat } from "../Models/chat.model.js"
import { Message } from "../Models/message.model.js"
import { getReceiverSocketId, io } from "../Socket/socket.js"

export async function sendMessage(req, res) {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let chat = await Chat.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!chat) {
            chat = await Chat.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            chat.messages.push(newMessage._id)
        }

        // Works paralel
        await Promise.all([newMessage.save(), chat.save()])

        // Socket.io
        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            // io.to(<socket.id>).emit() used to send event to specific clients
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)

    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" })
    }
}


export async function getMessages(req, res) {
    try {
        const { id: userToChat } = req.params
        const senderId = req.user._id


        const chat = await Chat.findOne({
            participants: { $all: [senderId, userToChat] },
        }).populate("messages")

        if (!chat) return res.status(400).json([]);

        const messages = chat.messages

        res.status(201).json(messages)
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" })
    }
}
