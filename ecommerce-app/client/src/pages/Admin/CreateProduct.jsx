import { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import Navtop from "../../components/Navtop";
import MainNav from "../../components/MainNav";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

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
        "http://localhost:8080/api/v1/product/create-product",
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
      <Navtop title={"Create-product "} />
      <MainNav />
      <AdminMenu />
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg border-dashed border-2 border-gray-400 w-[100%] h-screen">
          <h1 className="text-2xl">Create product </h1>
          <div className=" w-96">
            <Select
              bordered={false}
              placeholder="Select a Category"
              showSearch
              size="large"
              onChange={(value) => {
                setCategory(value);
              }}
              className="mb-3"
            >
              {categories?.map((c) => (
                <Select.Option key={c._id} value={c._id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>

            {/*Product Name*/}
            <div className="p-2">
              <Input
                size=""
                type="text"
                value={name}
                placeholder="Write a product name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/*Product Description*/}
            <div className="p-2">
              <TextArea
                showCount
                maxLength={200}
                type="text"
                value={description}
                placeholder="Write a product Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/*Product Price*/}
            <div className="p-2">
              <Input
                size=""
                type="text"
                value={price}
                placeholder="Write Product Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/*Product Quantity*/}
            <div className="p-2">
              <Input
                size=""
                controls={true}
                type="number"
                value={quantity}
                placeholder="Insert Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/*Product Shipping*/}
            <div className="p-2">
              <Select
                bordered={false}
                size="large"
                showSearch
                type="text"
                placeholder="Select Shipping"
                onChange={(value) => {
                  setShipping(value);
                }}
                className="w-96"
              >
                <Select.Option value="0">No</Select.Option>
                <Select.Option value="1">Yes</Select.Option>
              </Select>
            </div>

            {/*Upload Photo*/}
            <div className="p-2">
              <label className="flex justify-center p-2 border border-red-600 rounded-lg ">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div>
              {photo && (
                <div className="grid  justify-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product Photo"
                    className="h-40 "
                  />
                </div>
              )}
            </div>
            <div>
              <button className="p-2 bg-gray-400" onClick={handleCreate}>
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
