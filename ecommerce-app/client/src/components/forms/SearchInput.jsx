import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/searchpage");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex items-center justify-between cursor-pointer"
      >
        <input
          type="search"
          className="input input-sm  input-bordered border-[#164990] max-w-md focus:outline-none"
          placeholder="Search Product"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        {/*Search icon*/}
        <div
          onClick={handleSubmit}
          className="text-lg text-white bg-[#164990] rounded-r-lg p-[7.5px] relative right-3"
        >
          <BiSearch />
        </div>
      </form>
    </>
  );
};

export default SearchInput;
