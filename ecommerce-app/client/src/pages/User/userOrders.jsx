import React from 'react'
import Navtop from '../../components/Navtop'
import MainNav from '../../components/MainNav'
import UserMenu from '../../components/UserMenu'

const UserOrders = () => {
  return (
    <>
    <Navtop title={"User-Orders"} />
            <MainNav />
            <UserMenu />
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg border-dashed border-2 border-gray-400 h-screen">
                    <h1 className='text-2xl'>User - Orders </h1>
                </div>
            </div>
    </>
  )
}

export default UserOrders