import { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import Navtop from "../../components/Navtop";
import MainNav from "../../components/MainNav";
import { toast } from "react-hot-toast";
import axios from "axios";
import {Select} from "antd"

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

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

  return (
    <>
      <Navtop title={"Create-product "} />
      <MainNav />
      <AdminMenu />
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg border-dashed border-2 border-gray-400 w-[40%] h-screen">
          <h1 className="text-2xl">Create product </h1>
          <div className="m-1">
            <Select bordered={false} placeholder="Select Category" showSearch size="">

            </Select>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
