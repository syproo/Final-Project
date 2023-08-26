import { useState, useEffect } from 'react';
import Navtop from './../components/Navtop';
import MainNav from '../components/MainNav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';
import { useCart } from "../context/Cart";
import { toast } from "react-hot-toast";

const ProductDetails = () => {

  const params = useParams()
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart()

  // Initial Product Details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  // Get Product
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //Get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http:localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navtop />
      <MainNav />
      <div>
        {/* Product Image */}
        <div>
          <img
            className="object-fit w-96 h-80 rounded-lg transition duration-500 ease-in-out hover:scale-105"
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            alt={product._name}
          />
        </div>
        {/* Product details */}
        <div>

          <h1 className='text-2xl' >Product Details</h1>
          {JSON.stringify(product, null, 4)}
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product.category?.name}</h6>
          {/* Add to cart Button */}
          <button
            className=" rounded-lg p-2 border-2 border-white text-white bg-gray-800 hover:bg-yellow-300 hover:text-black hover:border-yellow-500"
            onClick={() => {
              setCart([...cart, p]);
              localStorage.setItem(
                "cart",
                JSON.stringify([...cart, p])
              );
              toast.success("Item Added to cart");
            }}
            >
            <a className="flex gap-2 items-center ">
              Add to Cart{" "}
              <span className="text-xl">
                <BsCartPlus />
              </span>
            </a>
          </button>
        </div>
      </div>
      {/* Similar Products */}
      <div>
        <h1>similar Products</h1>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="grid grid-cols-5 grid-flow-row p-4  justify-center gap-4">
          {relatedProducts?.map((p) => (
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProductDetails