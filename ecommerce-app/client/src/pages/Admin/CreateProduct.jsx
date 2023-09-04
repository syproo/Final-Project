import { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import Navtop from "../../components/Navtop";
import MainNav from "../../components/MainNav";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  //Get All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating Product");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //Handle Create Product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/create-product`,
         productData
      );
      if (data.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  return (
    <>
      <Navtop title={"Create-Product "} />
      <MainNav />
      <AdminMenu />
      <div className="p-4 sm:ml-64 font-fontApp ">
        <div className="p-2 rounded-lg border-dashed border-2 border-[#164990] w-full h-screen">
          <div className="grid justify-center w-[100%] h-full  p-12  bg-gradient-to-r from-[#164990] to-[#77AEDE] rounded">
            <h1 className="text-3xl text-center text-white font-semibold p-2">
              Add New Product{" "}
            </h1>
            <div className="form-control  md:w-96">
              <select
              
                className="select border-[#164990] focus:outline-none"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/*Product Name*/}
            <div className="form-control">
              <input
                className="input border-[#164990] focus:outline-none "
                type="text"
                value={name}
                placeholder="Write Product Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/*Product Description*/}
            <div className="form-control">
              <textarea
                className="textarea border-[#164990] focus:outline-none h-32 "
                type="text"
                value={description}
                placeholder="Write Product Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/*Product Price*/}
            <div className="form-control">
              <input
                className="input border-[#164990] focus:outline-none "
                type="number"
                value={price}
                placeholder="Write Product Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/*Product Quantity*/}
            <div className="form-control">
              <input
                className="input border-[#164990] focus:outline-none "
                type="number"
                value={quantity}
                placeholder="Insert Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/*Product Shipping*/}
            <div className="form-control ">
              <select
                placeholder="Select Shipping"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping}
                className="select border-[#164990] focus:outline-none"
              >
                <option disabled selected>
                  Select Shipping Status
                </option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            {/*Upload Photo*/}
            <div className="form-control w-full">
              <label className="flex justify-center p-2 border border-[#164990] rounded-lg cursor-pointer hover:bg-[#164990] text-white transition-all duration-300 ease-linear">
                {photo ? photo.name : "Upload Photo"}
                <input
                  className="file-input file-input-bordered w-full text"
                  type="file"
                 
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="">
              {photo && (
                <div className="grid  justify-center overflow-hidden bg-contain bg-no-repeat rounded-lg">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product Photo"
                    className="object-fit w-36 h-32 rounded-lg "
                  />
                </div>
              )}
            </div>
            <div className="grid justify-center">
              <button
                className="rounded bg-[#164990] px-6 py-1   text-lg text-white hover:bg-transparent transition-all duration-300 ease-linear border-[#164990] border"
                onClick={handleCreate}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
