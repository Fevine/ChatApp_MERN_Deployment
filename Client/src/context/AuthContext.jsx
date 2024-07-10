import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)

  const data = { authUser, setAuthUser }

  return (
    <AuthContext.Provider value={data} >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)