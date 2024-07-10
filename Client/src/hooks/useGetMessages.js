import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useChat from '../zustand/useChat'

function useGetMessages() {

  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedChat } = useChat()

  useEffect(() => {
    if (selectedChat?._id) getMessages();
  }, [selectedChat?._id, setMessages])

  async function getMessages() {
    setLoading(true)
    try {
      const res = await fetch(`/api/messages/${selectedChat._id}`)
      const data = await res.json()
      console.log(data);
      if (data.error) throw new Error(data.error)
      setMessages(data)

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading }
}

export default useGetMessages
