import React from 'react'
import AdminMenu from '../../components/AdminMenu'
import Navtop from '../../components/Navtop'
import MainNav from '../../components/MainNav'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
    const [auth] = useAuth()
    return (
        <>
                    <Navtop title={"Admin-dashboard"} />
                    <MainNav />
                    <div className='flex'>
                        <div><AdminMenu /></div>
                        <div className='flex-grow '>
                        <div className="p-4 sm:ml-64">
                        <div className="p-4 rounded-lg border-dashed border-2 border-gray-400 h-screen">
                            <h1 className='text-2xl'>Admin Name :  {auth?.user?.name} </h1>
                            <h1 className='text-2xl'>Admin email : {auth?.user?.email} </h1>
                            <h1 className='text-2xl'>Admin contact : {auth?.user?.phone} </h1>
                        </div>
                    </div>
                        </div>
                    </div>
                    
                 

        </>
    )
}

export default AdminDashboard