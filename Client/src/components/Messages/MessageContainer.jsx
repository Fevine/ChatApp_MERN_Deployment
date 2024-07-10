import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import NoChatSelected from './NoChatSelected'
import useChat from '../../zustand/useChat'

function MessageContainer() {

  const { selectedChat, setSelectedChat} = useChat()

  useEffect(() => {
    return (() => setSelectedChat(null))
  }, [setSelectedChat])
  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {selectedChat ? (
        <>
          {/* Header */}
          <div className="bg-slate-500">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">{selectedChat.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )
        :
        <NoChatSelected />}
    </div>
  )
}

export default MessageContainer
