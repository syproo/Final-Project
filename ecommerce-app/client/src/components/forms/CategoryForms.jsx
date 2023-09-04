import React from "react";

const CategoryForms = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <div className="block w-full h-40 rounded-lg bg-white p-10 font-fontApp shadow-md shadow-neutral">
        <form onSubmit={handleSubmit}>
          {/*E-mail input*/}
          <div className="relative mb-4">
            <input
              type="text"
              className="input w-full border border-[#164990] focus:ring-2 "
              placeholder="Enter New Category"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          {/*Submit button*/}
          <button
            type="submit"
            className="rounded bg-[#164990] px-8 py-2  text-lg text-white hover:bg-transparent hover:text-black transition-all duration-300 ease-linear border-[#164990] border"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CategoryForms;
