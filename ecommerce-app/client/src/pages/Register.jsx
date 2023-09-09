import { useState } from "react";
import MainNav from "../components/MainNav";
import Navtop from "../components/Navtop";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");

  const navigate = useNavigate();

  //Submit Handle
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          name,
          email,
          phone,
          password,
          key,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div>
      <Navtop title={"Mercado-Sign Up"} />
      <MainNav />
      <div className="flex flex-col justify-center h-[90vh] bg-gradient-to-b from-[#164990] to-[#276FB7] font-fontApp">
        <div className="w-96 h-auto p-6 mx-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-[#164990]">
            Sign Up Form
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter Your Full Name"
                className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#164990] focus:ring-[#164990] focus:outline-none focus:ring "
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Secret Key
              </label>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                required
                placeholder="Enter your secret key to secure your account"
                className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#164990] focus:ring-[#164990] focus:outline-none focus:ring "
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Enter Your Phone Number"
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-[#164990] focus:ring-[#164990] focus:outline-none focus:ring "
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Your Email"
                className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#164990] focus:ring-[#164990] focus:outline-none focus:ring "
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter the Password"
                className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#164990] focus:ring-[#164990] focus:outline-none focus:ring "
              />
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-black text-lg font-semibold border-2 border-[#164990] transition-colors duration-300 transform bg-white rounded-md hover:bg-[#164990] hover:text-white focus:outline-none focus:bg-[#164990]">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
