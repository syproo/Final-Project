import { Link } from "react-router-dom";
import useCategory from "../custom Hooks/useCategory.js";
import Navtop from "../components/Navtop";
import MainNav from "../components/MainNav.jsx";
const Categories = () => {
  const categories = useCategory();
  return (
    <div>
      <Navtop title={"All Categories"} />
      <MainNav/>
      <div className="" >
        <div className="w-full h-auto p-4 border-2 border-red-400 flex justify-center items-center content-center">
          {categories.map((c) => (
            <div className="" key={c._id}>
              <div className="">
                <Link to={`/category/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
