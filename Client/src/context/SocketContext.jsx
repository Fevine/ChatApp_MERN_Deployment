import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client'

const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {

  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const { authUser } = useAuthContext()

  useEffect(() => {
    if (authUser) {
      const socket = io("https://chatapp-mern-deployment-m22n.onrender.com", {
        query: {
          userId: authUser._id
        }
      })

      setSocket(socket)

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users)
      })

      return () => socket.close()
    } else {
      if (socket) {
        socket.close()
        setSocket(null)
      }
    }
  }, [authUser])



  const data = { socket, onlineUsers }

  return (
    <SocketContext.Provider value={data}>
      {children}
    </SocketContext.Provider>
  )

}

export const useSocketContext = () => useContext(SocketContext)