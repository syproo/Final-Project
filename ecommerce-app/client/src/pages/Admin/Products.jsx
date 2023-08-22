import AdminMenu from "../../components/AdminMenu"
import MainNav from "../../components/MainNav"
import React from "react"
import Navtop from "../../components/Navtop"

const Products = () => {
    return (
        <>
            <Navtop title={"dashboard - products"} />
            <MainNav />
            <AdminMenu />
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg border-dashed border-2 border-gray-400 h-screen">
                    <h1 className='text-2xl'>All Products </h1>
                </div>
            </div>
        </>
    )
}

export default Products