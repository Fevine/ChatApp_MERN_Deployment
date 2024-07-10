import React from 'react'
import SearchInput from './SearchInput'
import Chats from './Chats'
import LogoutBtn from './LogoutBtn'

function SideBar() {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      
      <SearchInput />

      <div className='divider px-3'></div>

      <Chats />

      <LogoutBtn />

    </div>
  )
}

export default SideBar
