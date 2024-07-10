import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../Skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

function Messages() {

  const { messages, loading } = useGetMessages()
  useListenMessages()
  const lastMessageRaf = useRef()


  useEffect(() => {
    setTimeout(() => {
      lastMessageRaf.current?.scrollIntoView({ behavior: "smooth" })
    }, 100);
  }, [messages])


  return (
    <div className='px-4 flex-1 overflow-auto'>

      {!loading && messages.length > 0 && messages.map((message) => (
        <div
          key={message._id}
          ref={lastMessageRaf}
        >
          <Message message={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-white">Send a message to start a chat</p>
      )}

    </div>
  )
}

export default Messages
