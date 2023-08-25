import React from 'react'
import Navtop from '../components/Navtop'
import MainNav from './../components/MainNav';
import { useSearch } from '../context/search';
import { BsCartPlus } from 'react-icons/bs';

const SearchPage = () => {
    const [values, setValues] = useSearch()
    return (
        <>
            <Navtop title={"Search-Categories-Page"} />
            <MainNav />
            <div className=''>
                <div className=''>
                    <h1 className='text-center text-2xl'>Search Results </h1>
                    <h6 className='text-center text-2xl'>{values?.results.length < 1 ?
                        "No products found" :
                        `Found${values?.results.length}`}
                    </h6>
                    <div className="grid grid-cols-5 grid-flow-row p-4  justify-center gap-4">
                        {values?.results.map((p) => (
                            <div
                                key={p._id}
                                className=" max-w-sm p-2 text-center text-black border border-yellow-400 rounded-lg shadow-lg shadow-gray-800 bg-white font-font"
                            >
                                <div className="overflow-hidden bg-contain bg-no-repeat shadow-md shadow-gray-800 rounded-lg">
                                    <img
                                        className="object-fit w-96 h-80 rounded-lg transition duration-500 ease-in-out hover:scale-105"
                                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                        alt=""
                                    />
                                </div>
                                <div className="text-lg font-bold underline p-2">
                                    {p.name}
                                </div>
                                <div className="font-bold">
                                    <p className="">
                                        {p.description.substring(0, 60)}...
                                    </p>
                                </div>
                                <div className="text-md font-semibold">
                                    <span>Rs : {p.price}</span>
                                </div>
                                <div className=" ">
                                    <div className="p-2">
                                        <button className=" rounded-lg p-2 border-2 border-white text-white bg-gray-800 hover:bg-yellow-300 hover:text-black hover:border-yellow-500">
                                            <a className="flex gap-2 items-center ">
                                                Add to Cart{" "}
                                                <span className="text-xl">
                                                    <BsCartPlus />
                                                </span>
                                            </a>
                                        </button>
                                    </div>
                                    <div className="rounded-lg p-2 border text-bold text-white bg-gray-800 shadow-md shadow-gray-800 hover:bg-yellow-300 hover:text-black hover:border-yellow-500">
                                        <button>Product Description....</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchPage