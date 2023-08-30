import { MdAdminPanelSettings, MdCreate } from "react-icons/md";
import { BiSolidBookAdd, BiLogoProductHunt } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <aside
      id="default-sidebar"
      className="font-fontApp fixed top-55 left-0 z-40  w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 "
      aria-label="Sidebar"
    >
      <div className="h-full w-full mx-auto px-3 py-4 overflow-y-auto bg-gradient-to-t from-[#164990] from-30% via-[#276FB7] via-50% to-[#1D5AA3] to-80%">
        <ul className="space-y-4 pt-3">
          <li>
            <NavLink
              to="/dashboard/admin"
              className="flex items-center justify-center p-1 rounded-lg bg-white shadow-md shadow-neutral-700"
            >
              <MdAdminPanelSettings className="text-6xl text-[#164990]" />
              <span className="ml-2 text-xl text-[#164990] font-bold">
                {" "}
                Admin Dashboard
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/create-category"
              className="flex items-center p-2 text-white rounded-lg hover:bg-white hover:text-[#164990]"
            >
              <BiSolidBookAdd className="text-2xl" />
              <span className="flex-1 ml-3 whitespace-nowrap text-lg">
                Create Category
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/create-product"
              className="flex items-center p-2 text-white rounded-lg hover:bg-white hover:text-[#164990]"
            >
              <MdCreate className="text-2xl" />{" "}
              <span className="flex-1 ml-3 whitespace-nowrap text-lg">
                {" "}
                Create Product{" "}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/products"
              className="flex items-center p-2 text-white rounded-lg hover:bg-white hover:text-[#164990]"
            >
              <BiLogoProductHunt className="text-2xl" />
              <span className="flex-1 ml-3 whitespace-nowrap text-lg">
                All Products
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/admin/orders"
              className="flex items-center p-2 text-white rounded-lg hover:bg-white hover:text-[#164990] transition-colors duration-300 "
            >
              <AiFillCheckCircle className="text-2xl " />{" "}
              <span className="flex-1 ml-3 whitespace-nowrap text-lg">
                Orders{" "}
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminMenu;
