import { useState } from "react";
import MainNav from "../components/MainNav";
import Navtop from "../components/Navtop";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  //Register Form Submit Handle
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div>
      <Navtop title={"Mercado-Login"} />
      <MainNav />
      <div className=" font-fontApp w-full mx-auto bg-gradient-to-b from-[#164990] to-[#276FB7]">
        <div className="grid justify-items-center p-6">
        <div className="relative top-6">
          <img className="w-24" src="/images/avatar.png" alt="logo" />
        </div>
        <div className=" w-96 p-6 h-full bg-white rounded-md shadow-md shadow-current lg:max-w-xl">
          <h1 className="text-2xl font-semibold text-center text-[#164990] underline">
            Log In
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-black">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Your Email"
                className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#164990] focus:ring-[#164990] focus:outline-none focus:ring focus:ring-opacity-70"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-black">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter the Password"
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-[#164990] focus:ring-[#164990] focus:outline-none focus:ring focus:ring-opacity-70"
              />
            </div>
            <Link to={"/forgotpassword"}>
              <div className="text-md text-[#164990] underline">
                Forgot Password
              </div>
            </Link>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-black text-lg font-semibold border-2 border-[#164990] transition-colors duration-300 transform bg-white rounded-md hover:bg-[#164990] hover:text-white focus:outline-none focus:bg-[#164990]">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
