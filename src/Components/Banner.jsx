import React from "react";

const Banner = () => {
  return (
    <div className="max-w-screen mx-auto bg-amber-600 rounded-2xl p-15 mb-5">
      <h2 className="text-5xl mb-5 font-semibold text-white">
        Order your favourite food here
      </h2>
      <p className="text-1.5xl mb-5 font-normal text-white">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satisfy your carvings and elevate your dining experience , one
        delicious meal at a time.
      </p>
      <button className=" bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-2xl shadow">
        View Menu
      </button>
    </div>
  );
};

export default Banner;
