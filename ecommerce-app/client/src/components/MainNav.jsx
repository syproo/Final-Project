import { NavLink, Link } from "react-router-dom";
 import { useAuth } from "../context/auth.jsx";
import toast from "react-hot-toast";
import { Collapse, Dropdown, initTE } from "tw-elements";

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
                <li
                  className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
                  data-te-nav-item-ref
                  data-te-dropdown-ref
                >
                  {/* Dropdown */}
                  <div className="flex ">
                    <div>
                      <>
                        <img
                          src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                          className="w-8 rounded-full"
                          alt="Avatar"
                        />
                      </>
                    </div>
                    <div>
                      <NavLink
                        className="flex items-center text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                        type="button"
                        id="dropdownMenuButton2"
                        data-te-dropdown-toggle-ref
                        aria-expanded="false"
                      >
                        {auth?.user?.name}
                        <span className="ml-1 w-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </NavLink>
                      <ul
                        className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                        aria-labelledby="dropdownMenuButton2"
                        data-te-dropdown-menu-ref
                      >
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role == 1 ? "admin" : "user"
                            }`}
                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                            data-te-dropdown-item-ref
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/login"
                            onClick={handleLogout}
                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                            data-te-dropdown-item-ref
                          >
                            Log out
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
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

initTE({ Collapse, Dropdown });
export default MainNav;
