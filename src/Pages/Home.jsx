import React, { useState } from "react";
import Banner from "../Components/Banner";
import ExploreMenu from "../Components/ExploreMenu";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className="mx-10">
      <Banner />
      <ExploreMenu category={category} setCategory={setCategory} />
    </div>
  );
};

export default Home;
