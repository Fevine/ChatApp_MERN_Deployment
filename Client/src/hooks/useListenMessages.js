import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useChat from '../zustand/useChat'
import NotificationSound from "./../assets/sounds/ChatAppNotificationSound.mp3"

function useListenMessages() {

  const { socket } = useSocketContext()
  const { messages, setMessages } = useChat()

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true
      const sound = new Audio(NotificationSound)
      sound.play()
      setMessages([...messages, newMessage])
    })

    return () => socket?.off("newMessage")

  }, [socket, setMessages, messages])

}

export default useListenMessages
