import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useChat from '../../zustand/useChat'
import { extractTime } from '../../utils/extractTime'

function Message({ message }) {

  const { authUser } = useAuthContext()
  const { selectedChat } = useChat()
  const fromMe = message.senderId === authUser._id
  const chatClassName = fromMe ? "chat-end" : "chat-start"
  const profilePic = fromMe ? authUser.profilePic : selectedChat?.profilePic
  const bubleBgColor = fromMe ? "bg-blue-500" : "";
  const formatedTime = extractTime(message.createdAt)
  const shakeClass = message.shouldShake ? "shake" : ""


  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt='Tailwind css bouble component'
            src={profilePic}
          />
        </div>
      </div>

      <div className={`chat-bubble text-white ${bubleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formatedTime}</div>
    </div>
  )
}

export default Message
