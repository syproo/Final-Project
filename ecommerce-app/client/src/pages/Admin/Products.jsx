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
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg border-dashed border-2 border-gray-400">
          <h1 className="text-2xl text-center">All Products </h1>
        </div>
        <div className="grid grid-cols-3 grid-flow-row gap-4 p-4 w-[100%] items-center justify-items-center">
          {products?.map((p) => (
            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
              <div>
                <div className="overflow-hidden bg-contain bg-no-repeat shadow-md shadow-gray-800 rounded-lg">
                  <img
                    className="object-fit w-96 h-80 rounded-lg transition duration-500 ease-in-out hover:scale-105"
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    alt=""
                  />
                </div>
                <div className="text-lg font-bold underline p-2">{p.name}</div>
                <div className="text-md font-semibold">
                  <span>Rs : {p.price}</span>
                </div>
                <div className="text-md font-semibold">
                  <span>Qty :{p.quantity}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
