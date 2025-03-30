import React, { useEffect } from "react";
import { menu_list } from "../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col" id="explore_menu">
      <h1 className="text-3xl font-semibold text-gray-600 mb-2">
        Explore Our Menu
      </h1>
      <p className="">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satisfy your carvings and elevate your dining experience , one
        delicious meal at a time.
      </p>
      <div className="my-5 flex justify-between items-center gap-5 overflow-auto">
        {menu_list.map((element, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === element.menu_name ? "All" : element.menu_name
                )
              }
            >
              <img
                src={element.menu_image}
                alt=""
                className={`min-w-20 cursor-pointer transition-discrete ${
                  category === element.menu_name
                    ? "rounded-full border-3 border-amber-700 flex justify-center items-center p-1"
                    : ""
                }`}
              />
              <p className="mt-2.5 font-medium text-1.5xl flex justify-center">
                {element.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="my-2.5 h-0.5 bg-gray-300 border-0" />
    </div>
  );
};

export default ExploreMenu;
