import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoCart,
  decrementProduct,
  incrementProduct,
  removeFromCart,
} from "../Redux/Slice/FoodSlice";
import { assets } from "../assets/frontend_assets/assets";

const FoodItems = ({category}) => {
  const foodlist = useSelector((state) => state.fooditem.foodlist);
  const cartItems = useSelector((state) => state.fooditem.cartItems);
  const dispatchItems = useDispatch();

  console.log(foodlist);
  console.log("cartItems", cartItems);
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

  //Total price
  const totalPrice = cartItems.reduce(
    (total, data) => total + data.price * (data.quantity || 1),
    0
  );
  console.log("Totalprice", totalPrice);
  //Total quantity
  const totalQuantity = cartItems.reduce(
    (total, data) => total + (data.quantity || 1),
    0
  );
  console.log("TotalQuantity", totalQuantity);
  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Top dishes near you
      </h2>
      <div className="grid md:grid-cols-4 md:gap-4 grid-cols-2 gap-2">
        {foodlist.map((element, index) => {
          if (category === "All" || category === element.category) {
            return (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 relative z-10"
              >
                <img className="rounded-t-lg" src={element.image} alt="" />
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
