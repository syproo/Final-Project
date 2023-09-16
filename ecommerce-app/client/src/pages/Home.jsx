import { useState, useEffect } from "react";
import MainNav from "../components/MainNav";
import Navtop from "../components/Navtop";
import Carousal from "../components/Carousal";
import Footer from "../components/Footer";
import axios from "axios";
import { BsCartPlus } from "react-icons/bs";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import { toast } from "react-hot-toast";
import Services from "../components/Services";

const Home = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  //For Product Filter
  const [checked, setChecked] = useState([]);

  //For Product price filter
  const [radio, setRadio] = useState([]);

  //Product Count
  const [total, setTotal] = useState(0);

  //Product per Page
  const [page, setPage] = useState(1);

  //State for Loading More products
  const [loading, setLoading] = useState(false);

  //Filter By Category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //Get All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //Get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //Lifecycle Method
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //Get Product Total COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //load more Products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      // eslint-disable-next-line no-unsafe-optional-chaining
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //Get Filtered Products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to add a product to the cart
  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex !== -1) {
      // If the product is already in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...product, quantity: 1 }])
      );
    }

    toast.success("Item Added to cart");
  };
  return (
    <>
      <div className="font-fontApp container mx-auto">
        <Navtop title={"Mercado-Home"} />
        <MainNav />
        <Carousal />

        <div className="flex md:flex-row w-full  justify-center">
          <div className="md:basis-1/6  md:sticky md:top-36 md:left-2 h-auto md:h-[50%] p-2 mt-6 md:block  hidden">
            {/*Product Filter by Category */}
            <div className="grid p-4 mt-14 space-y-2 border-2 border-[#164990] rounded-lg">
              <h1 className="text-lg font-semibold underline">
                Filter By Category
              </h1>
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  className="text-md font-medium"
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            {/*Product Filter by price*/}
            <div className="flex flex-col mt-2 p-4 border-2 border-[#164990] rounded-lg">
              <h1 className="text-lg font-semibold underline">
                Filter By Price
              </h1>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id} className="text-md font-medium">
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            {/*Filter Clear Button*/}
            <div className="text-center mt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-2 py-2 tracking-wide hover:text-black font-md border-2 border-[#164990] transition-colors duration-300 transform hover:bg-white rounded-md bg-[#164990] text-white focus:outline-none focus:bg-[#164990]"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/*All Products */}
          <div className="md:basis-5/6 p-2">
            <div className="md:grid md:justify-items-center p-3">
              <h1 className="text-xl md:text-3xl font-semibold underline p-4 text-center">
                All Products
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
                {products?.map((p) => (
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    key={p._id}
                    className="max-w-xs p-2 text-center text-black border border-[#1D5AA3] rounded-lg bg-white"
                  >
                    <div className="overflow-hidden bg-no-repeat block rounded-lg ">
                      <img
                        className="object-fit md:h-44 md:w-full w-60 h-28 rounded-lg transition duration-300 ease-in-out hover:scale-105"
                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                        alt=""
                      />
                    </div>
                    <div className="md:text-lg font-semibold underline p-2">
                      {p.name}
                    </div>
                    <div className="font-medium hidden md:block">
                      <p className="">{p.description.substring(0, 60)}...</p>
                    </div>
                    <div className="text-md font-semibold">
                      <span>Rs : {p.price}</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-1">
                      <div className="">
                        <button
                          className=" rounded-lg p-1 md:p-2 border-2 border-[#164990] hover:bg-[#164990] hover:text-white transition duration-300 ease-in-out"
                          onClick={() => addToCart(p)}
                        >
                          <a className="md:flex gap-2 items-center font-normal md:text-[12px]">
                            <span className="hidden md:block">Add to Cart</span>

                            <span className="text-lg md:text-xl font-bold ">
                              <BsCartPlus />
                            </span>
                          </a>
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => navigate(`/product/${p.slug}`)}
                          className="rounded-lg p-1 md:p-2 text-[10px] md:text-[12px] text-white bg-[#164990] border-2 border-[#164990]"
                        >
                          More Info ...
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/*Product Count */}
              <div className="text-center p-4">
                {products && products.length < total && (
                  <button
                    className="rounded bg-[#164990] px-8 py-2  text-md text-white hover:bg-transparent hover:text-black transition-all duration-500 ease-linear border-[#164990] border"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "loading ..." : "Load More ..."}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <Services />
        <Footer />
      </div>
    </>
  );
};

export default Home;
