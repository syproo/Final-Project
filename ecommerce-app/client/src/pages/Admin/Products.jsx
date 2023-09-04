import AdminMenu from "../../components/AdminMenu";
import MainNav from "../../components/MainNav";
import Navtop from "../../components/Navtop";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //To Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed while fetching all Products");
    }
  };

  //Lifecycle Method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Navtop title={"dashboard - products"} />
      <MainNav />
      <AdminMenu />
      <div className="p-4 sm:ml-64 font-fontApp">
        <div className="p-2 rounded-lg border-dashed border-2 border-[#164990]">
          <div className="bg-gradient-to-r from-[#164990] to-[#77AEDE] rounded">
            <h1 className="text-3xl text-center text-white font-semibold p-4">
              All Products{" "}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3 w-[100%] items-center justify-items-center ">
              {products?.map((p) => (
                <div key={p._id} className="bg-white p-3 rounded">
                  <div className="overflow-hidden bg-contain bg-no-repeat shadow-md shadow-gray-800 rounded-lg">
                    <img
                      className="object-fit w-96 h-80 rounded-lg transition duration-500 ease-in-out hover:scale-105"
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      alt=""
                    />
                  </div>
                  <div className="text-lg font-semibold underline p-1">
                    {p.name}
                  </div>
                  <div className="text-md font-semibold p-1">
                    <span>Rs : {p.price}</span>
                  </div>
                  <div className="flex justify-between   px-1">
                    <span className="font-semibold text-md">
                      Qty : {p.quantity}
                    </span>

                    <Link to={`/dashboard/admin/product/${p.slug}`}>
                      <button className="rounded bg-[#164990] p-1 text-sm  text-white hover:bg-transparent hover:text-[#164990] transition-all duration-300 ease-linear border-[#164990] border">
                        Edit Product
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
