import React from 'react'
import Chat from './Chat'
import useGetChats from '../../hooks/useGetChats'
import { getRandomEmoji } from '../../utils/emojis';

function Chats() {

  const { loading, chats } = useGetChats()

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {chats.map((chat, idx) => (
        <Chat
          key={chat._id}
          chat={chat}
          emoji={getRandomEmoji()}
          lastIdx={idx === chats.length - 1}
        />
      ))}

      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  )
}

export default Chats
