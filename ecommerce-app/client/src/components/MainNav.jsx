import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/auth.jsx";
import toast from "react-hot-toast";

const MainNav = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };
  return (
    <>
      

      <div className="flex justify-between p-4 border-2 border-red-400 items-center">
        {/*Logo*/}

        <div className="cursor-pointer">
          <Link to={"/"}>
            <h1 className="text-4xl font-bold">Mercado</h1>
          </Link>
        </div>
        {/*NavLinks*/}
        <div className="">
          <ul className="flex gap-8 text-lg font-semibold p-2">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/Category"}>Category</NavLink>
            </li>
            {/*Login and Logout turnery operator*/}
            {!auth.user ? (
              <>
                <li>
                  <NavLink to={"/Login"}>Login</NavLink>
                </li>
                <li>
                  <NavLink to={"/register"}>Sign Up</NavLink>
                </li>
              </>
            ) : (
              <>
             
                <li>
                  <NavLink onClick={handleLogout} to={"/login"}>
                    Logout
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to={"/Cart"}>Cart (0)</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MainNav;
