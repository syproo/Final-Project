import { BsTelephoneFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { Helmet } from "react-helmet";

// eslint-disable-next-line react/prop-types
const Navtop = ({ title, description, author, keyword }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keyword" content={keyword} />
        <title>{title}</title>
      </Helmet>
      <div className="fixed top-0 left-0 z-10 w-[100%] mx-auto font-fontApp bg-[#164990] text-white font-medium cursor-pointer md:flex md:justify-evenly md:flex-row items-center content-center p-1 text-center flex flex-col justify-center h-auto">
        <div className="flex items-center gap-2">
          <div className=" text-xl">
            <HiOutlineMail />
          </div>

          <div>info@mercado.com</div>
        </div>
        <div>
          <div>Welcome to Mercado | Online Shopping in Pakistan</div>
        </div>
        <div className="flex items-center gap-1">
          <div className=" text-lg">
            <BsTelephoneFill />
          </div>
          <div>+92 0123456789</div>
        </div>
      </div>
    </div>
  );
};
Navtop.defaultProps = {
  title: "Mercado",
  description: "Full Stack ECommerce App",
  keyword: "shopping,online Shopping,shopping karachi",
  author: "Phoenix Coders",
};

export default Navtop;
