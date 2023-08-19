import { BsFillEnvelopeAtFill, BsTelephoneFill } from "react-icons/bs";
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
      <div className="font-fontApp bg-green-400 font-medium cursor-pointer flex justify-evenly items-center content-center p-1 w-[100%] h-auto shadow-lg shadow-inherit">
        <div className="flex items-center gap-1">
          <div className="text-blue-600 text-lg">
            <BsFillEnvelopeAtFill />
          </div>

          <div>info@mercado.com</div>
        </div>
        <div>
          <div>Welcome to Mercado | Online Shopping in Pakistan</div>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-blue-600 text-lg">
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
