import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";

import axios from "axios";
import Navtop from "../components/Navtop";
import MainNav from "../components/MainNav";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navtop />
      <MainNav />
      <div className="">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} - result found </h6>
        <div className="justify-center text-center">
          <div className="grid grid-cols-5 grid-flow-row p-4  justify-center gap-4">
            {products?.map((p) => (
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
                <div className="text-lg font-bold underline p-2">{p.name}</div>
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
                    <button onClick={() => navigate(`/product/${p.slug}`)}>
                      Product Description....
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
