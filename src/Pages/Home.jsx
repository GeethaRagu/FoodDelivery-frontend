import React, { useState } from "react";
import Banner from "../Components/Banner";
import ExploreMenu from "../Components/ExploreMenu";
import FoodItems from "../Components/FoodItems";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className="mx-10">
      <Banner />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodItems/>
    </div>
  );
};

export default Home;
