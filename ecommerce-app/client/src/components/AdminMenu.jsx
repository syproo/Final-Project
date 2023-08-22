import React from 'react'
import { FaPenFancy } from "react-icons/fa";
import { BiBookAdd } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { NavLink } from 'react-router-dom';


const AdminMenu = () => {
    return (
         <aside id="default-sidebar" className=" fixed top-55 left-0 z-40 w-64 h-screen  transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                          <NavLink to ="/dashboard/admin" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span className="ml-3 text-xl"> Admin  Dashboard</span>
                            </NavLink>  
                    </li>
                    <li>
                        <NavLink to="/dashboard/admin/create-category" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <BiBookAdd />
                            <span className="flex-1 ml-3 whitespace-nowrap">Create Category</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/admin/create-product" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FaPenFancy />  <span className="flex-1 ml-3 whitespace-nowrap">  Create Product  </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/admin/products" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/admin/orders" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <AiFillCheckCircle /> <span className="flex-1 ml-3 whitespace-nowrap">Orders </span>
                        </NavLink>
                    </li>
                </ul>
            </div>
         </aside>
    )
}

export default AdminMenu