import AdminMenu from "../../components/AdminMenu";
import Navtop from "../../components/Navtop";
import MainNav from "../../components/MainNav";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <Navtop title={"Admin-dashboard"} />
      <MainNav />
      <div className="flex font-fontApp">
        <div>
          <AdminMenu />
        </div>
        <div className="flex-grow  ">
          <div className="p-4 sm:ml-64">
            <div className="grid p-4 rounded-lg border-dashed border-4 border-[#1D5AA3] h-[80vh]  justify-items-center content-center space-y-10 bg-blue-100">
              <h1 className="text-4xl font-semibold underline text-black">
                Welcome to Dashboard{" "}
                <span className="text-[#1D5AA3]">Mr. {auth?.user?.name}</span>
              </h1>
              <div className="bg-[#1D5AA3] text-white p-6 rounded-lg space-y-2">
                <h1 className="text-2xl">Admin Name : {auth?.user?.name} </h1>
                <h1 className="text-2xl">Admin email : {auth?.user?.email} </h1>
                <h1 className="text-2xl">
                  Admin contact : {auth?.user?.phone}{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
