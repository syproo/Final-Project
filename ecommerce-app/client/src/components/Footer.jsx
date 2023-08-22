import {FaFacebookF, FaInstagram, FaTwitter} from "react-icons/fa"
const Footer = () => {
  return (
    <div className="grid items-center justify-items-center p-10 bg-base-200 text-base-content rounded">
      <div className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <div className="text-blue-700 text-2xl">
            <FaFacebookF/>
          </div>
          <div className="text-[radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);] text-2xl">
            <FaInstagram/>
          </div>
          <a>
            <FaTwitter/>
          </a>
        </div>
      </div>
      <div>
        <p>Copyright © 2023 - All right reserved by Mercado</p>
      </div>
    </div>
  );
};

export default Footer;
