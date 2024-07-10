import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5';
import useChat from '../../zustand/useChat';
import useGetChats from '../../hooks/useGetChats';
import toast from 'react-hot-toast';

function SearchInput() {

  const [search, setSearch] = useState("")
  const { setSelectedChat } = useChat()
  const { chats } = useGetChats()

  function handleSubmit(e) {
    e.preventDefault()
    if (!search) return;

    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long")
    }

    const chat = chats.find(x => x.fullName.toLowerCase().includes(search.toLowerCase()))

    if (chat) {
      setSelectedChat(chat)
      setSearch("")
    } else {
       return toast.error("No such user found")
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Search...'
        className='input input-bordered rounded-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
    </form>
  )
}

export default SearchInput
