import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function useGetChats() {

  const [loading, setLoading] = useState(false)
  const [chats, setChats] = useState([])

  useEffect(() => {
    getChats()
  }, [])

  async function getChats() {
    setLoading(true)
    try {
      const res = await fetch("/api/users")
      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }
      setChats(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, chats }
}

export default useGetChats
