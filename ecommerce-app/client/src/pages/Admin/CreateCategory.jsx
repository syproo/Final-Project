import React from 'react'
import AdminMenu from '../../components/AdminMenu'
import Navtop from '../../components/Navtop'
import MainNav from '../../components/MainNav'

const CreateCategory = () => {
  return (
    <>
     <Navtop title={"Create - Category"} />
            <MainNav />
            <AdminMenu />
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg border-dashed border-2 border-gray-400 h-screen">
                    <h1 className='text-2xl'>Create Category </h1>
                </div>
            </div>
    </>
  )
}

export default CreateCategory