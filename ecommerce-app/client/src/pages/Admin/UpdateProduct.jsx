import { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import Navtop from "../../components/Navtop";
import MainNav from "../../components/MainNav";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select, Input } from "antd";
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  //Get single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/single-product/${params.slug}`
      );
      setCategory(data.product.category._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        productData
      );
      if (data.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  //Handle Delete
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const answer = window.prompt(
        "Are you sure want to delete this product ?"
      );
      if (!answer) {
        return;
      }
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
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
          <h1 className="text-2xl">Update product </h1>
          <div className=" w-96">
            <Select
              bordered={false}
              placeholder="Update Category"
              size="large"
              onChange={(val) => {
                setCategory(val);
              }}
              className="mb-3"
              value={category}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            {/*Product Name*/}
            <div className="p-2">
              <Input
                size=""
                type="text"
                value={name}
                placeholder="Update Product name"
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
                placeholder="Update Product Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/*Product Price*/}
            <div className="p-2">
              <Input
                size=""
                type="text"
                value={price}
                placeholder="Update Product Price"
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
                placeholder="Update Quantity"
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
                placeholder="Update Shipping"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping ? "Yes" : "No"}
                className="w-96"
              >
                <Select.Option value="0">No</Select.Option>
                <Select.Option value="1">Yes</Select.Option>
              </Select>
            </div>

            {/*Upload Photo*/}
            <div className="p-2">
              <label className="flex justify-center p-2 border border-red-600 rounded-lg ">
                {photo ? photo.name : "Update Product Photo"}
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
              {photo ? (
                <div className="grid  justify-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product Photo"
                    className="h-40 "
                  />
                </div>
              ) : (
                <div className="grid  justify-center">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                    alt="Product Photo"
                    className="h-40 "
                  />
                </div>
              )}
            </div>
            <div className="flex justify-center gap-8 p-4">
              <button className="p-2 bg-gray-400" onClick={handleUpdate}>
                Update Product
              </button>
              <button className="p-2 bg-gray-400" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
