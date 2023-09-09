import { useState, useEffect } from "react";
import Navtop from "./../components/Navtop";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { useCart } from "../context/Cart";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Initial Product Details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/single-product/${params.slug}`
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
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
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
      <div className="font-fontApp">
        <div className="flex justify-center p-5  mt-4">
          {/* Product Image */}
          <div className=" overflow-hidden mr-8">
            <img
              className="object-fit w-[400px] h-auto rounded-lg transition duration-500 ease-in-out hover:scale-105"
              src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
              alt={product._name}
            />
          </div>
          {/* Product details */}
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Product Details</h1>
            <h6 className=" text-lg font-semibold">{product.name}</h6>
            <h6 className="">{product.description}</h6>
            <h6 className="font-semibold">Rs : {product.price}</h6>
            {/* <h6>Category : {product?.category?.name}</h6> */}
            {/* Add to cart Button */}
            <div className="flex gap-4">
            <button
              className=" rounded-lg p-2 border-2 border-[#164990] hover:bg-[#164990] hover:text-white transition duration-300 ease-in-out"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
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
            <button
              onClick={() => navigate(-1)}
              className="rounded-lg px-4 py-2 font-medium text-sm text-white bg-[#164990] border-2 border-[#164990]"
            >
              Go Back
            </button>
            </div>
          </div>
        </div>
        {/* Similar Products */}
        <div className="border-2 border-orange-500">
          <h1 className="text-2xl font-semibold text-center p-2 underline">
            Similar Products{" "}
          </h1>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products Found</p>
          )}
          <div className="grid grid-cols-5 grid-flow-row p-4  justify-center gap-4">
            {relatedProducts?.map((p) => (
              <div
                key={p._id}
                className=" max-w-sm p-2 text-center text-black border border-yellow-400 rounded-lg shadow-lg shadow-gray-800 bg-white font-font"
              >
                <div className="overflow-hidden bg-no-repeat block rounded-lg">
                  <img
                    className="object-fit  md:h-56 md:w-full w-48 h-28 rounded-lg transition duration-300 ease-in-out hover:scale-105"
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    alt=""
                  />
                </div>
                <div className="text-lg font-semibold underline p-2">
                  {p.name}
                </div>
                <div className="text-md">
                  <p className="">{p.description.substring(0, 60)}...</p>
                </div>
                <div className="text-md font-semibold">
                  <span>Rs : {p.price}</span>
                </div>
                <div className=" ">
                  <div className="p-2">
                    <button className=" rounded-lg p-2 border-2 border-[#164990] hover:bg-[#164990] hover:text-white transition duration-300 ease-in-out">
                      <a className="flex gap-2 items-center ">
                        Add to Cart{" "}
                        <span className="text-xl font-bold">
                          <BsCartPlus />
                        </span>
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
