import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

function useSignUp() {
  const [loading, setLoading] = useState(false)
  const { authUser, setAuthUser } = useAuthContext()

  async function signup({ fullName, username, password, confirmPassword, gender }) {
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender })
    if (!success) return;

    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
      })

      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      // Localstorage
      localStorage.setItem("chat-user", JSON.stringify(data))
      // Context
      setAuthUser(data)

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }

  }

  return { loading, signup }
}

export default useSignUp


function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all fields")
    return false
  }

  if (password !== confirmPassword) {
    toast.error("Passwords doesn't match")
    return false
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters")
    return false
  }

  return true
}
