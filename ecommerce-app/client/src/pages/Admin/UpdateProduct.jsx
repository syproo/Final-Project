import { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import Navtop from "../../components/Navtop";
import MainNav from "../../components/MainNav";
import { toast } from "react-hot-toast";
import axios from "axios";
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
      setCategory(data.product.category);
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
      const answer = window.alert("Are you sure want to delete this product ?");
      if (!answer === "yes") {
        return;
      }
      // eslint-disable-next-line no-unused-vars
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
      <Navtop title={"Edit-Product "} />
      <MainNav />
      <AdminMenu />
      <div className="p-4 sm:ml-64 font-fontApp">
        <div className="p-2 rounded-lg border-dashed border-2 border-[#164990] w-full h-full overflow-hidden">
          <div className="grid justify-center w-[100%] h-auto   p-12  bg-gradient-to-r from-[#164990] to-[#77AEDE] rounded">
            <h1 className="text-3xl text-center text-white font-semibold p-2">
              Edit Product{" "}
            </h1>
            <div className="space-y-2">
              <div className="form-control md:w-96">
                <select
                  className="select border-[#164990] focus:outline-none"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  
                >
                  <option disabled selected>
                  Update Category
                </option>
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
                  placeholder="Edit Product name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/*Product Description*/}
              <div className="form-control">
                <textarea
                  className="textarea border-[#164990] focus:outline-none h-32 "
                  type="text"
                  value={description}
                  placeholder="Edit Product Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/*Product Price*/}
              <div className="form-control">
                <input
                  className="input border-[#164990] focus:outline-none "
                  type="number"
                  value={price}
                  placeholder="Edit Product Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/*Product Quantity*/}
              <div className="form-control">
                <input
                  className="input border-[#164990] focus:outline-none "
                  type="number"
                  value={quantity}
                  placeholder="Edit Quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/*Product Shipping*/}
              <div className="form-control">
                <select
                  className="select border-[#164990] focus:outline-none"
                  type="text"
                  placeholder="Edit Shipping"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              {/*Upload Photo*/}
              <div className="form-control w-full">
                <label className="flex justify-center p-2 border border-[#164990] rounded-lg cursor-pointer hover:bg-[#164990] text-white transition-all duration-300 ease-linear">
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
                  <div className="grid  justify-center overflow-hidden bg-contain bg-no-repeat rounded-lg">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product Photo"
                      className="object-fit w-40 h-36 rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="grid  justify-center overflow-hidden bg-contain bg-no-repeat rounded-lg">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                      alt="Product Photo"
                      className="object-fit w-40 h-36 rounded-lg "
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-between gap-8 p-4">
                <button
                  className="rounded bg-[#164990] px-2 py-2 text-md text-white hover:bg-transparent transition-all duration-300 ease-linear border-[#164990] border"
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
                <button
                  className="rounded bg-[#cf1a0d] px-2 py-2 text-md text-white hover:bg-transparent transition-all duration-300 ease-linear border-[#164990] border"
                  onClick={handleDelete}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
