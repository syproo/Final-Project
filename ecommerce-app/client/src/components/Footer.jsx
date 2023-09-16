import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="">
    <footer className="font-fontApp footer footer-center p-12 text-[#164990] w-[100%] h-auto border-t-2 border-t-[#164990]">
      
      <div className="grid grid-flow-col gap-4">
        <span className="link link-hover">About us</span>
        <span className="link link-hover">Contact</span>
        <span className="link link-hover">Jobs</span>
        <span className="link link-hover">Press kit</span>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4 cursor-pointer">
          <FaFacebookF className="text-blue-700 text-4xl bg-white rounded-lg p-1 items-center content-center justify-center shadow-md shadow-black" />
          <FaInstagram className="text-pink-500 text-4xl bg-white rounded-lg p-1 items-center content-center justify-center shadow-md shadow-black" />
          <FaTwitter className="text-blue-500 text-4xl bg-white rounded-lg p-1 items-center content-center justify-center shadow-md shadow-black" />
        </div>
      </div>
      <div>
        <p>Copyright © 2023 - All right reserved by Phoenix Coders</p>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
