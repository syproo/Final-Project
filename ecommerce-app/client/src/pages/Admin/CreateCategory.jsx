import { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminMenu";
import Navtop from "../../components/Navtop";
import MainNav from "../../components/MainNav";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForms from "../../components/forms/CategoryForms";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created `);
        getAllcategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong input form");
    }
  };

  // Get All Categories
  const getAllcategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error(`something went wrong`);
    }
  };

  useEffect(() => {
    getAllcategory();
  }, []);

  // Update category
  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${name} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllcategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong while updating");
    }
  };

  // Delete category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        toast.success(`category is deleted`);
        getAllcategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong while Deleting");
    }
  };
  return (
    <>
      <Navtop title={"Create - Category"} />
      <MainNav />
      <AdminMenu />
      <div className="p-4 sm:ml-64 font-fontApp">
        <div className="grid grid-cols-1 w-full grid-flow-row text-center p-2 mt-2 rounded-lg border-dashed border-2 border-[#164990] h-auto overflow-hidden">
          <div className="bg-gradient-to-r from-[#164990] to-[#77AEDE] p-4 rounded-md h-auto">
            <div>
              <h1 className="text-3xl text-white font-semibold mt-4">
                Create Categories{" "}
              </h1>
            </div>

            {/* form for Adding new categories */}
            <div className="flex w-[100%] p-4 justify-center h-auto">
              <CategoryForms
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
          </div>

          {/* table for categories */}

          <div className="">
            <div className="overflow-x-auto   h-80 mt-2">
              <table className="table table-pin-rows">
                <thead className="text-lg sticky top-0">
                  <tr className="bg-[#164990] text-white">
                    <th className="font-medium ">S#</th>
                    <th className="font-medium ">Category</th>
                    <th className="font-medium ">Edit Category</th>
                    <th className="font-medium ">Delete Category</th>
                  </tr>
                </thead>
                <tbody className="bg-[#77AEDE]">
                  {categories?.map((c, Index) => (
                    <tr key={c._id}>
                      <td>{Index + 1} .</td>
                      <td> {c.name} </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                          className=" rounded bg-[#164990] px-8 py-2  text-md text-white hover:bg-transparent hover:text-black transition-all duration-300 ease-linear border-[#164990] border "
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                          className=" rounded bg-[#cf1a0d] px-6 py-2  text-md text-white hover:bg-transparent hover:text-black transition-all duration-300 ease-linear border-[#cf1a0d] border "
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* modal */}
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <CategoryForms
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </>
  );
};

export default CreateCategory;
