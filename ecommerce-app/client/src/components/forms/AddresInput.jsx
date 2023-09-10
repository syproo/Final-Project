import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import DropIn from "braintree-web-drop-in-react";
import { useAuth } from '../../context/auth'
import { useCart } from '../../context/Cart'
import { useNavigate } from 'react-router-dom'

const AddressInput = () => {
  //States For Addres Input
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  // states for payment 
  const [clientToken, setClientToken] = useState("")
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart()
  const navigate = useNavigate()


  //Code for payment 
  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  // Use effect  Hook for payment
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://localhost:8080/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/address", {
        name,
        email,
        phone,
        address,
        postalCode,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" flex font-fontApp flex-col gap-5">
      {/* Code For Address input  */}
      <h1
        className='text-base text-center border text-bold border-blue rounded-lg bg-[#164990]   text-white p-2  shadow-lg shadow-blue-600 w-40'>
        Enter Address
      </h1>
      <form
        className="font-fontApp block w-full h-full rounded-lg bg-white p-10 font-fontApp shadow-md shadow-neutral"
        onSubmit={handleSubmit} >

        {/* Name Input */}
        <div className='relative mb-4'>
          <h1>Enter  Your Full Name </h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input w-full border border-[#164990] focus:ring-2 "
            id="exampleInputEmail1"
            placeholder="Full Name "
            required
          />
        </div>
        {/* Email Input */}
        <div className='relative mb-4'>
          <h1>Enter Your Email Address</h1>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full border border-[#164990] focus:ring-2 "
            id="exampleInputEmail1"
            placeholder="  Email Address"
            required
          />
        </div>
        {/* Phone Input */}
        <div className='relative mb-4'>
          <h1>Enter Your Phone No</h1>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input w-full border border-[#164990] focus:ring-2 "
            id="exampleInputEmail1"
            placeholder="  Phone No"
            required
          />
        </div>
        {/* Postal Code Input */}
        <div className='relative mb-4'>
          <h1>Enter Postal Code</h1>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="input w-full border border-[#164990] focus:ring-2 "
            id="exampleInputEmail1"
            placeholder=" Postal Code"
            required
          />
        </div>
        {/* Address Input */}
        <div className='relative mb-4'>
          <h1>Enter Your Full Address</h1>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input w-full border border-[#164990] focus:ring-2 "
            id="exampleInputEmail1"
            placeholder="  Full Address"
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type='submit'
          className="rounded bg-[#164990] px-8 py-2  text-lg text-white hover:bg-transparent hover:text-black transition-all duration-300 ease-linear border-[#164990] border">
          Submit
        </button>
      </form>
      {/* Code For Payment Gateway */}
      <h1
        className='text-base  border text-bold border-blue rounded-lg bg-[#164990]   text-white p-2  shadow-lg shadow-blue-600 w-40 text-center'>
        Payment
      </h1>
      <div className="block w-full h-full rounded-lg bg-white p-10 font-fontApp shadow-md shadow-neutral">
        {!clientToken || !auth?.token || !cart?.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => setInstance(instance)}
            />

            <button
              className="text-base font-fontApp border text-bold border-blue rounded-lg bg-[#164990]   text-white p-2"
              onClick={handlePayment}
              disabled={loading || !instance}
            >
              {loading ? "Processing ...." : "Make Payment"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default AddressInput