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
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg border-dashed border-2 border-gray-400 h-screen">
          <h1 className="text-2xl">Manage Categories </h1>
          {/* form for Adding new categories */}
          <div>
            <CategoryForms
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          {/* table for categories */}
          <div>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories?.map((c) => (
                          <>
                            <tr>
                              <td key={c._id}>{c.name} </td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setVisible(true);
                                    setUpdatedName(c.name);
                                    setSelected(c);
                                  }}
                                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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
                                  className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
