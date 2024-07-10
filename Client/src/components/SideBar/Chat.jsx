import React from 'react'
import useChat from './../../zustand/useChat';
import { useSocketContext } from '../../context/SocketContext';

function Chat({ chat, lastIdx, emoji }) {

  const { selectedChat, setSelectedChat, } = useChat()
  const { onlineUsers } = useSocketContext()

  const isOnline = onlineUsers.includes(chat._id)
  const isSelected = selectedChat?._id === chat._id


  return (
    <>
      <div className={`flex gap-2 items-center transition-opacity hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
      ${isSelected ? "bg-sky-500" : ""}
      `}
        onClick={() => setSelectedChat(chat)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img alt='user avatar' src={chat.profilePic} />
          </div>
        </div>
        <div className="flex flex-col flex-1">

          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{chat.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>

        </div>

      </div>

      {/* Divider */}
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  )
}

export default Chat
