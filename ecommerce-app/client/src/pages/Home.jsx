import { useState, useEffect } from "react";
import MainNav from "../components/MainNav";
import Navtop from "../components/Navtop";
import Carousal from "../components/Carousal";
import Footer from "../components/Footer";
import axios from "axios";
import { BsCartPlus } from "react-icons/bs";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import SearchInput from "../components/forms/SearchInput";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  //For Product Filter
  const [checked, setChecked] = useState([]);

  //For Product price filter
  const [radio, setRadio] = useState([]);

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
  }, []);

  //Get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
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

  return (
    <>
      <div>
        <Navtop title={"Mercado-Home Page"} />
        <MainNav />
        <Carousal />
        <div> 
          <h1 className="text-2xl">Search Categories below</h1>
          <SearchInput />
        </div>
        <div className="">
          {/*Product Filter by Category */}
          <div className="flex flex-col p-4">
            <h1>Filter By Category</h1>
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/*Product Filter by price*/}
          <div className="flex flex-col p-4">
            <h1>Filter By Price</h1>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          {/*Filter Clear Button*/}
          <div>
            <button onClick={() => window.location.reload()}>Clear Filters</button>
          </div>

          {/*All Products */}
          <div className="justify-center text-center">

            <h1>All Products</h1>
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
                      <button onClick={() => navigate(`/product/${p.slug}`)}>Product Description....</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      
        </div>


    </>
  );
};

export default Home;
