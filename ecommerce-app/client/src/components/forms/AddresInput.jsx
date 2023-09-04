import { useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';

const AddressInput = () => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

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
    <div className="block w-full h-full rounded-lg bg-white p-10 font-fontApp shadow-md shadow-neutral">
      <form onSubmit={handleSubmit}>

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
    </div>
  )
}

export default AddressInput