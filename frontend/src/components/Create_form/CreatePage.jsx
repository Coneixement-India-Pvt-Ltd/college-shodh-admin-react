import React from 'react'
import Navbar from '../Admin_panel/Navbar'
import Create from './Create'
import Sidebar from '../Admin_panel/Sidebar'
import CreateBulk from './CreateBulk'

const InboxPage = () => {
  return (
    <>
    <Navbar />
    <Sidebar />
    <CreateBulk />
    <Create />
    </>
  )
}

export default InboxPage