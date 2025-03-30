import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoCart,
  decrementProduct,
  incrementProduct,
  removeFromCart,
  showProducts,
} from "../Redux/Slice/FoodSlice";
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";

const FoodItems = ({category}) => {
  const foodlist = useSelector((state) => state.fooditem.foodlist);
 
  const cartItems = useSelector((state) => state.fooditem.cartItems);
  const dispatchItems = useDispatch();
  
  // console.log("foodlist",foodlist);
  // console.log("cartItems", cartItems);

  const apiurl = import.meta.env.VITE_API_URLKEY;
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await axios
      .get(`${apiurl}/api/food/list`)
      .then((res) => {
        dispatchItems(showProducts(res.data.data));
      })
      .catch((error) => console.log(error));
  };

  const handleInc = (id, quantity, name, description, image, price) => {
    dispatchItems(incrementProduct({ id }));
    let addedItems = {
      _id: id,
      name: name,
      description: description,
      price: price,
      image: image,
    };
    console.log(addedItems);
    dispatchItems(addtoCart(addedItems));
  };
  const handleDec = (id, quantity) => {
    dispatchItems(decrementProduct({ id }));
    dispatchItems(removeFromCart({ id }));
  };

  
  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Top dishes near you
      </h2>
      <div className="grid md:grid-cols-4 md:gap-4  sm:grid-cols-2 grid-cols-1 gap-2">
        {foodlist.map((element, index) => {
          if (category === "All" || category === element.category) {
            return (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 relative z-10"
              >
                <img className="rounded-t-lg" src={`${apiurl}/images/${element.image}`} alt="" />
                {!element.quantity ? (
                  <button
                    className="absolute top-2 right-1 z-100"
                    onClick={() =>
                      handleInc(
                        element._id,
                        element.quantity || 1,
                        element.name,
                        element.description,
                        element.image,
                        element.price
                      )
                    }
                  >
                    <img src={assets.add_icon_white} className="w-6" />
                  </button>
                ) : (
                  <div className="absolute top-2 right-1 z-100 bg-amber-50 p-2 border rounded-2xl flex items-center gap-2">
                    <span>
                      <button
                        onClick={() =>
                          handleDec(element._id, element.quantity || 1)
                        }
                      >
                        <img src={assets.remove_icon_red} className="w-6" />
                      </button>
                    </span>
                    <span className="text-1xl font-semibold -mt-1.5">
                      {element.quantity ? element.quantity : 0}
                    </span>
                    <span>
                      <button
                        onClick={() =>
                          handleInc(
                            element._id,
                            element.quantity || 1,
                            element.name,
                            element.description,
                            element.image,
                            element.price
                          )
                        }
                      >
                        <img src={assets.add_icon_green} className="w-6" />
                      </button>
                    </span>
                  </div>
                )}
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {element.name}
                  </h5>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {element.description}
                  </p>
                  <p className="mb-3 font-semibold text-2xl text-amber-600 dark:text-amber-400">
                    ₹{element.price}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodItems;
