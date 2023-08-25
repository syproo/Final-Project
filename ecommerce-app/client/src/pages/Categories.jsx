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
        <div className="w-96">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div className="card">
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
