import { Link } from "react-router-dom";
import MainNav from "../components/MainNav";
import Navtop from "../components/Navtop";

const Pagenotfound = () => {
  return (
    <>
      <Navtop title={"Mercado-Page Not Found"}/>
      <MainNav />
      <div className="w-full h-auto text-center items-center flex flex-col justify-center">
        <img className="w-[300px]" src=".//images/notfound.png" alt="" />
        <p className="text-4xl p-4 font-semibold">
          {" "}
          Oops ! The page you are trying to access is not available
        </p>
        <Link to={"/"}>
          <button className="p-4 border-2 rounded-md text-lg font-semibold">
            Go Back
          </button>
        </Link>
      </div>
    </>
  );
};

export default Pagenotfound;
