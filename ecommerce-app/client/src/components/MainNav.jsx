import { NavLink, Link } from "react-router-dom";
 import { useAuth } from "../context/auth.jsx";
import toast from "react-hot-toast";
import useCategory from "../custom Hooks/useCategory.js";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { useCart } from "../context/Cart.jsx";

const MainNav = () => {
  const [cart] = useCart()
  const [auth, setAuth] = useAuth();
  const categories = useCategory();

  //State to manage Navbar on all screens
  const [mobileNav, setMobileNav] = useState(false);

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
      <div className="fixed md:top-7 top-16 left-0 w-[100%] z-[10] text-lg mx-auto font-fontApp shadow-md px-8 py-4 items-center bg-white">
        <div className="flex justify-between items-center">
          {/*Logo*/}
          <div className=" cursor-pointer ">
            <Link to={"/"}>
              <img
                className="object-cover block w-36"
                src="/images/logo.png"
                alt=""
              />
            </Link>
          </div>
          {mobileNav ? (
            <AiFillCloseCircle
              onClick={() => setMobileNav(!mobileNav)}
              className="text-[#164990] text-4xl md:hidden block"
            />
          ) : (
            <BiMenuAltRight
              onClick={() => setMobileNav(!mobileNav)}
              className="text-[#164990] text-4xl items-center md:hidden block"
            />
          )}

          {/*NavLinks*/}
          <div className="hidden md:flex ">
            <ul className="flex gap-6 text-lg font-semibold p-2 items-center text-center justify-center">
              <li className=" px-2 py-1 rounded-md hover:bg-[#164990] hover:text-white  transition-colors duration-300">
                <NavLink to={"/"}>Home</NavLink>
              </li>

              {/*Category Dropdown */}

              <div className=" dropdown dropdown-hover ">
                <label tabIndex={0} className=" hover:text-[#164990]">
                  <Link to={"/categories"}>Categories</Link>
                </label>

                <ul className=" bg-white text-black dropdown-content z-[1] py-2 menu shadow-current shadow-md   rounded-box w-40">
                  <li>
                    <Link
                      className="p-2 justify-center hover:bg-[#164990] hover:text-white"
                      to={`/categories`}
                    >
                      All Categories
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <>
                      <li>
                        <Link
                          className="p-2 justify-center hover:bg-[#164990] hover:text-white transition duration-300 ease-in-out"
                          to={`/category/${c.slug}`}
                          key={c._id}
                        >
                          {c.name}
                        </Link>
                      </li>
                    </>
                  ))}
                </ul>
              </div>

              {/*Login and Logout turnery operator*/}
              {!auth.user ? (
                <>
                  <li>
                    <NavLink
                      to={"/Login"}
                      className="border-2 border-[#164990] rounded-lg px-3 py-1 hover:bg-[#164990] hover:text-white transition duration-300 ease-in-out shadow-sm shadow-[#164990]"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/register"}
                      className="border-2 border-[#164990] rounded-lg px-3 py-1 hover:bg-[#164990] hover:text-white transition duration-300 ease-in-out shadow-sm shadow-[#164990]"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <details className="dropdown">
                    <summary
                      tabIndex={0}
                      className="py-1 px-3 flex items-center cursor-pointer  text-[#164990] shadow-sm shadow-current rounded-full hover:bg-[#164990] hover:text-white transition duration-300 ease-in-out"
                    >
                      <RxAvatar className="text-3xl " />
                      <div className="text-md">{auth?.user?.name}</div>
                      <span className="text-2xl">
                        <MdOutlineKeyboardArrowDown />
                      </span>
                    </summary>

                    <ul className=" bg-white menu dropdown-content mt-3 z-[1] rounded-box w-44 shadow-sm shadow-current">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? `admin` : `user`
                            }`}
                          className="hover:bg-[#164990] hover:text-white rounded transition duration-300 ease-in-out"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          onClick={handleLogout}
                          className="hover:bg-[#164990] hover:text-white rounded transition duration-300 ease-in-out"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </details>
                </>
              )}
              <li>
                <NavLink to={"/Cart"}>
                  <div className="text-[#164990]  text-2xl mr-2 border-2 border-[#164990] rounded-full p-2 hover:bg-[#164990] hover:text-white transition duration-300 ease-in-out shadow-sm shadow-[#164990]">
                    <FaShoppingCart />
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/*Mobile Navbar*/}

          <ul
            className={`md:hidden fixed top-36 text-lg text-white flex flex-col items-center font-semibold p-8 w-full h-screen bg-[#1D5AA3] ${mobileNav ? "left-[0]" : "left-[-100%] "
              } duration-500 `}
          >
            <li className="m-4">
              <NavLink to={"/"}>Home</NavLink>
            </li>

            {/*Category Dropdown */}

            <details className=" dropdown m-4">
              <summary className=" cursor-pointer">Categories</summary>

              <ul
                tabIndex={0}
                className="dropdown-content z-[1] py-2 menu rounded-box w-40 bg-white text-black "
              >
                <li className="">
                  {" "}
                  <Link
                    className="p-1 hover:bg-[#164990] hover:text-white rounded-md transition duration-200 ease-in-out"
                    to={`/categories`}
                  >
                    All Categories
                  </Link>
                </li>
                {categories.map((c) => (
                  <>
                    <li key={c._id}>
                      <Link
                        className="p-1 hover:bg-[#164990] hover:text-white rounded-md transition duration-200 ease-in-out"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  </>
                ))}
              </ul>
            </details>

            {/*Login and Logout turnery operator*/}
            {!auth.user ? (
              <>
                <li className="m-6">
                  <NavLink to={"/Login"}>Login</NavLink>
                </li>
                <li>
                  <NavLink to={"/register"}>Sign Up</NavLink>
                </li>
              </>
            ) : (
              <>
                <details className="dropdown p-2">
                  <summary
                    tabIndex={0}
                    className="p-1 flex items-center cursor-pointer rounded-full"
                  >
                    <RxAvatar className="text-3xl " />
                    <div className="text-md">{auth?.user?.name}</div>
                    <span className="text-2xl">
                      <MdOutlineKeyboardArrowDown />
                    </span>
                  </summary>

                  <ul className=" menu dropdown-content mt-3 z-[1]  rounded-box w-52 bg-white text-black">
                    <li className="">
                      <NavLink
                        to={`/dashboard/${auth?.user?.role === 1 ? `admin` : `user`
                          }`}
                        className="hover:bg-[#164990] hover:text-white rounded-md transition duration-200 ease-in-out"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink
                        to="/login"
                        onClick={handleLogout}
                        className="hover:bg-[#164990] hover:text-white rounded-md transition duration-200 ease-in-out"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </details>
              </>
            )}
            <li>
              <NavLink to={"/Cart"}>Cart ( {cart?.length} )</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MainNav;
